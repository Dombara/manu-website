import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { quoteService } from "../lib/services/quoteService";

type FormStatus = "idle" | "submitting";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

const inputClasses =
  "w-full rounded-lg border border-[#404040] bg-[#1a1a1a] px-4 py-3 font-inter text-[15px] text-white placeholder:text-[#666666] outline-none transition-colors focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000]/40";

const labelClasses = "block font-inter text-[14px] text-[#e6ecf5] mb-1.5";

const errorTextClasses = "font-inter text-[13px] text-[#ef4444] mt-1";

export function QuoteModal({
  isOpen,
  onClose,
  preselectedProduct,
}: QuoteModalProps) {
  const [form, setForm] = useState({
    product: "",
    name: "",
    email: "",
    contact: "",
    description: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const submissionInProgress = useRef(false);

  useEffect(() => {
    if (isOpen && preselectedProduct) {
      setForm((prev) => ({ ...prev, product: preselectedProduct }));
    }
  }, [isOpen, preselectedProduct]);

  useEffect(() => {
    if (isOpen) {
      setForm({
        product: preselectedProduct || "",
        name: "",
        email: "",
        contact: "",
        description: "",
        consent: false,
      });
      setErrors({});
      setStatus("idle");
    }
  }, [isOpen, preselectedProduct]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};

    if (!form.product) e.product = "Please select a product.";
    if (!form.name.trim()) e.name = "Please enter your full name.";
    if (!form.email.trim()) {
      e.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.contact.trim()) {
      e.contact = "Please enter your contact number.";
    } else if (!/^[+]?[\d\s\-()]{7,20}$/.test(form.contact.trim())) {
      e.contact = "Please enter a valid phone number.";
    }
    if (!form.consent) {
      e.consent = "You must agree to be contacted.";
    }

    setErrors(e);

    if (Object.keys(e).length === 0) {
      console.log("[QUOTE] Form validation passed");
    } else {
      console.warn("[QUOTE] Form validation failed", e);
    }

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submissionInProgress.current) return;
    if (!validate()) return;

    submissionInProgress.current = true;
    setStatus("submitting");

    try {
      const response = await quoteService.submit(form);
      if (!response.success) {
        throw new Error(response.message || "Unable to send your enquiry.");
      }

      toast.success("Enquiry sent successfully!", {
        description: "Our team will get back to you shortly.",
        duration: 5000,
        icon: <CheckCircle2 size={18} className="text-[#22c55e]" />,
      });
      setForm({
        product: preselectedProduct || "",
        name: "",
        email: "",
        contact: "",
        description: "",
        consent: false,
      });
      setErrors({});
    } catch (err) {
      const message = err instanceof Error
        ? err.message
        : "Something went wrong. Please try again.";
      toast.error(message, {
        duration: 6000,
        icon: <AlertCircle size={18} className="text-[#ef4444]" />,
      });
    } finally {
      submissionInProgress.current = false;
      setStatus("idle");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "product") {
      console.log("[QUOTE] Product selected:", value);
    }
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-[560px] my-8 mx-4 rounded-2xl border border-[#404040] bg-[#1a1a1a] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-[#404040] bg-[#2a2a2a] text-[#999] transition-colors hover:text-white hover:border-[#666]"
            >
              <X size={16} />
            </button>

            <form onSubmit={handleSubmit} noValidate>
                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-[#404040]">
                  <h2 className="font-montserrat text-[22px] font-bold gradient-text mb-1">
                    Get in Touch
                  </h2>
                  <p className="font-inter text-[14px] text-[#999]">
                    Tell us about your requirement and we&apos;ll get back to you.
                  </p>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
                  {/* Product is fixed by the page that opened the modal. */}
                  <div>
                    <label className={labelClasses}>
                      Product <span className="text-[#ef4444]">*</span>
                    </label>
                    <div className={inputClasses}>{form.product}</div>
                    {errors.product && (
                      <p className={errorTextClasses}>{errors.product}</p>
                    )}
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>
                        Full Name <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`${inputClasses} ${errors.name ? "border-[#ef4444]" : ""}`}
                      />
                      {errors.name && (
                        <p className={errorTextClasses}>{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className={labelClasses}>
                        Work Email <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className={`${inputClasses} ${errors.email ? "border-[#ef4444]" : ""}`}
                      />
                      {errors.email && (
                        <p className={errorTextClasses}>{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className={labelClasses}>
                      Contact Number <span className="text-[#ef4444]">*</span>
                    </label>
                    <input
                      name="contact"
                      value={form.contact}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className={`${inputClasses} ${errors.contact ? "border-[#ef4444]" : ""}`}
                    />
                    {errors.contact && (
                      <p className={errorTextClasses}>{errors.contact}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className={labelClasses}>
                      Requirement Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Briefly describe your requirement, application, location, or any specific details you'd like us to know."
                      className={`${inputClasses} resize-none ${errors.description ? "border-[#ef4444]" : ""}`}
                    />
                    {errors.description && (
                      <p className={errorTextClasses}>{errors.description}</p>
                    )}
                  </div>

                  {/* Consent */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={form.consent}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-[#404040] bg-[#1a1a1a] accent-[#cc0000]"
                      />
                      <span className="font-inter text-[14px] text-[#e6ecf5] leading-snug">
                        I agree to be contacted regarding my enquiry.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className={errorTextClasses}>{errors.consent}</p>
                    )}
                  </div>

                </div>

                {/* Footer */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#cc0000] px-6 py-3.5 font-inter text-[16px] font-medium text-white transition-all hover:bg-[#e60000] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Enquiry
                      </>
                    )}
                  </button>
                </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
