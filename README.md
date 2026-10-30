# Manu Robotics Website

Manu Robotics website with a React/Vite frontend and a FastAPI email backend.

## Stack

- React 19, TypeScript, Vite
- Tailwind CSS, Framer Motion, Lucide React
- FastAPI, Uvicorn, Pydantic
- Gmail SMTP for quote and contact email delivery

## Project Structure

```text
manu-website/
├── src/
│   ├── App.tsx                    # Home page, navigation, products, footer
│   ├── components/
│   │   ├── ContactPage.tsx        # Request Demo/contact form
│   │   ├── QuoteModal.tsx         # Product quote form
│   │   ├── InfraAutomationPage.tsx# Synapse product page
│   │   ├── operational-software.tsx # CrossCheck product page
│   │   ├── HiringPage.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   └── ui/                    # Reusable UI components
│   ├── lib/
│   │   ├── api/                   # HTTP API clients
│   │   ├── services/              # Form validation and service logic
│   │   └── utils.ts
│   ├── styles/global.css
│   └── assets/
├── public/                        # Images, videos, and static pages
├── backend/
│   ├── main.py                    # FastAPI application and SMTP delivery
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
├── package.json
├── vite.config.ts
└── README.md
```

## Prerequisites

- Node.js 18 or newer
- npm
- Python 3.10 or newer
- A Gmail account with a Gmail App Password, or another SMTP provider

## Frontend Setup

From the project root:

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

Available commands:

```bash
npm run build    # Type-check and create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build
```

For local development, quote requests and contact messages use the Vite `/api` proxy configured in `vite.config.ts`. Set `VITE_API_URL` or `VITE_QUOTE_API_URL` to the deployed backend origin or its `/api` base URL when deploying the frontend.

## Backend Setup

The backend is Python-based and lives in `backend/`:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

```powershell
.venv\Scripts\Activate.ps1
```

Install dependencies and start FastAPI:

```bash
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 5000
```

The API runs at `http://localhost:5000`.

## Backend Environment

Copy the example file and configure SMTP values:

```powershell
Copy-Item .env.example .env
```

Required settings:

```env
PORT=5000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
MAIL_TO=production@manurobotics.com
MAIL_FROM=your-gmail@gmail.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=10
```

Never commit `.env` or expose SMTP credentials. Gmail requires an App Password when two-step verification is enabled.

## API Endpoints

### Health check

```http
GET /api/health
```

### Submit quote enquiry

```http
POST /api/quote
Content-Type: application/json
```

```json
{
  "product": "CrossCheck",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "contact": "+91 78410 64877",
  "description": "Optional requirement details",
  "consent": true
}
```

`product` must be `CrossCheck` or `Synapse`. The product is selected by the product page, and the requirement description is optional.

### Submit contact message

```http
POST /api/contact
Content-Type: application/json
```

The request includes `name`, `email`, `company`, `subject`, and `message`. Both form endpoints send email server-side to `MAIL_TO`; SMTP credentials remain in the backend environment.

The API validates input, applies per-IP rate limiting, and sends an HTML enquiry email through the configured SMTP server.

## Website Flows

- Home page: brand navigation, product cards, footer contact links
- CrossCheck page: product information and preselected CrossCheck quote modal
- Synapse page: product information and preselected Synapse quote modal
- Request Demo page: contact form with optional message field
- Footer: email, phone, and LinkedIn links

## Local Testing

Use two terminals from the project root:

```powershell
# Terminal 1
cd backend
.venv\Scripts\Activate.ps1
uvicorn main:app --host 0.0.0.0 --port 5000

# Terminal 2
npm run dev
```

Then open `http://localhost:5173`, open CrossCheck or Synapse, and submit a test quote. Check the configured `MAIL_TO` inbox.

## Deployment Notes

1. Build the frontend with `npm run build`.
2. Deploy the generated `dist/` directory to a static host.
3. Deploy `backend/` to a Python-compatible host.
4. Configure backend environment variables on the host.
5. Set `VITE_QUOTE_API_URL` to the deployed API base URL.
6. Update `ALLOWED_ORIGINS` in `backend/main.py` with the production frontend URL.

Do not commit credentials, virtual environments, `node_modules`, or build output.
