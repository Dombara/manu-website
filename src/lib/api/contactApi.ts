import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
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

class ContactApi {
  async sendMessage(formData: ContactFormData): Promise<ApiResponse> {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('[ContactApi] EmailJS is not configured.');
      throw new Error(
        'Email service is not configured. Please contact support.',
      );
    }

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          company: formData.company || '',
          subject: formData.subject,
          message: formData.message,
          product: formData.subject,
          contact: formData.company || '',
          description: formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      );

      if (result.status !== 200) {
        console.error(
          '[ContactApi] EmailJS returned error:',
          result.status,
          result.text,
        );
        throw new Error(
          'Something went wrong while sending your message. Please try again.',
        );
      }

      console.log('[ContactApi] Contact message sent successfully', result);
      return { success: true, message: 'Message sent successfully!' };
    } catch (err) {
      console.error('[ContactApi] EmailJS submission error:', err);
      throw new Error('Unable to send your message. Please try again.');
    }
  }
}

export const contactApi = new ContactApi();
