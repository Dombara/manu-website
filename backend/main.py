from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
import smtplib
from email.message import EmailMessage
import logging
import os
import re
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv

# Load .env from the backend directory
BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

app = FastAPI()
logger = logging.getLogger(__name__)

origins = [
    "https://manurobotics.com",
    "https://www.manurobotics.com",
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# EMAIL CONFIGURATION
# ==========================

SMTP_SERVER = os.getenv("EMAIL_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("EMAIL_PORT", "587"))
SMTP_USE_SSL = os.getenv("EMAIL_SECURE", "false").lower() in {"1", "true", "yes"}
SMTP_USERNAME = os.getenv("EMAIL_USER", "")
SMTP_PASSWORD = os.getenv("EMAIL_PASSWORD", "")
FROM_EMAIL = os.getenv("MAIL_FROM", SMTP_USERNAME)
TO_EMAIL = os.getenv("MAIL_TO", "production@manurobotics.com")

# ==========================
# VALID PRODUCTS
# ==========================
VALID_PRODUCTS = ["CrossCheck", "Synapse"]

# ==========================
# FORM MODEL
# ==========================

class FormDetails(BaseModel):
    product: str
    name: str
    email: str
    contact: str
    description: str = ""
    consent: bool

    @field_validator("product")
    @classmethod
    def validate_product(cls, v: str) -> str:
        if v not in VALID_PRODUCTS:
            raise ValueError("Please select a valid product.")
        return v.strip()

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Please provide your full name.")
        return v

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", v):
            raise ValueError("Please provide a valid email address.")
        return v

    @field_validator("contact")
    @classmethod
    def validate_contact(cls, v: str) -> str:
        return v.strip()

    @field_validator("consent")
    @classmethod
    def validate_consent(cls, v: bool) -> bool:
        if v is not True:
            raise ValueError("You must agree to be contacted.")
        return v


class ContactMessage(BaseModel):
    name: str
    email: str
    company: str = ""
    subject: str
    message: str = ""

    @field_validator("name", "subject")
    @classmethod
    def validate_required_text(cls, v: str) -> str:
        value = v.strip()
        if not value:
            raise ValueError("This field is required.")
        return value

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        value = v.strip().lower()
        if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", value):
            raise ValueError("Please provide a valid email address.")
        return value

    @field_validator("company", "message")
    @classmethod
    def trim_optional_text(cls, v: str) -> str:
        return v.strip()


def send_email(subject: str, reply_to: str, body: str) -> None:
    if not SMTP_USERNAME or not SMTP_PASSWORD or not FROM_EMAIL:
        logger.error("SMTP email settings are incomplete.")
        raise HTTPException(status_code=503, detail="Email service is unavailable.")

    email = EmailMessage()
    email["From"] = FROM_EMAIL
    email["To"] = TO_EMAIL
    email["Reply-To"] = reply_to
    email["Subject"] = subject
    email.set_content(body)

    smtp_client = smtplib.SMTP_SSL if SMTP_USE_SSL else smtplib.SMTP
    try:
        with smtp_client(SMTP_SERVER, SMTP_PORT, timeout=20) as server:
            if not SMTP_USE_SSL:
                server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(email)
    except Exception as error:
        logger.exception("SMTP delivery failed.")
        raise HTTPException(
            status_code=502,
            detail="Unable to deliver the enquiry email.",
        ) from error


# ==========================
# HOME PAGE
# ==========================
@app.get("/")
async def form_page():
    return {"message": "Form Submission Server is running\n"}


@app.get("/api/health")
async def health():
    return {"success": True, "message": "Manu Robotics API is running"}


# ==========================
# FORM SUBMISSION
# ==========================
def send_quote(form: FormDetails) -> dict[str, object]:
    now = datetime.now().strftime("%A, %d %B %Y, %I:%M %p")
    body_text = f"""New Quote Request - {form.product}

Product: {form.product}
Name: {form.name}
Email: {form.email}
Contact: {form.contact}

Requirement:
{form.description}

Consent: Yes
Submitted: {now}
"""
    send_email(
        subject=f"New Quote Request - {form.product}",
        reply_to=form.email,
        body=body_text,
    )
    return {"success": True, "message": "Enquiry sent successfully!"}


@app.post("/api/quote")
@app.post("/submit/", include_in_schema=False)
async def submit_quote(form: FormDetails):
    return send_quote(form)


@app.post("/api/contact")
async def submit_contact_message(form: ContactMessage):
    now = datetime.now().strftime("%A, %d %B %Y, %I:%M %p")
    body = f"""New Website Contact Message

Name: {form.name}
Email: {form.email}
Company/Organization: {form.company or 'Not provided'}
Subject: {form.subject}

Message:
{form.message or 'Not provided'}

Submitted: {now}
"""
    send_email(
        subject=f"Website Contact: {form.subject}",
        reply_to=form.email,
        body=body,
    )
    return {"success": True, "message": "Message sent successfully!"}
