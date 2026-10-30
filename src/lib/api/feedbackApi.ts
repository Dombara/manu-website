import emailjs from '@emailjs/browser';

export interface FeedbackFormData {
  name: string;
  email: string;
  role: string;
  category: string;
  subject: string;
  rating: number;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

const EMAILJS_SERVICE_ID = import.meta.env?.VITE_EMAILJS_SERVICE_ID as
  | string
  | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env?.VITE_EMAILJS_TEMPLATE_ID as
  | string
  | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY as
  | string
  | undefined;

const CATEGORY_LABELS: Record<string, string> = {
  general: 'General',
  bug: 'Bug Report',
  feature: 'Feature Request',
  data: 'Data / Sensor Issue',
};

class FeedbackApi {
  async sendMessage(formData: FeedbackFormData): Promise<ApiResponse> {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('[FeedbackApi] EmailJS is not configured.');
      throw new Error(
        'Email service is not configured. Please contact support.',
      );
    }

    try {
      const categoryLabel =
        CATEGORY_LABELS[formData.category] || formData.category;
      const subject = formData.subject || `${categoryLabel} feedback`;
      const details = [
        `Category: ${categoryLabel}`,
        `Rating: ${formData.rating > 0 ? `${formData.rating}/5` : 'Not rated'}`,
        `Submitted by: ${formData.name} (${formData.role}) — ${formData.email}`,
        '',
        formData.message,
      ].join('\n');

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          company: '',
          subject,
          message: details,
          product: subject,
          contact: formData.role,
          description: details,
          category: categoryLabel,
          rating: String(formData.rating),
        },
        EMAILJS_PUBLIC_KEY,
      );

      if (result.status !== 200) {
        console.error(
          '[FeedbackApi] EmailJS returned error:',
          result.status,
          result.text,
        );
        throw new Error(
          'Something went wrong while sending your feedback. Please try again.',
        );
      }

      console.log('[FeedbackApi] Feedback sent successfully', result);
      return { success: true, message: 'Feedback sent successfully!' };
    } catch (err) {
      console.error('[FeedbackApi] EmailJS submission error:', err);
      throw new Error('Unable to send your feedback. Please try again.');
    }
  }
}

export const feedbackApi = new FeedbackApi();
