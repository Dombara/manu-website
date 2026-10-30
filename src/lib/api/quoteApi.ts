import emailjs from '@emailjs/browser';

export interface QuoteFormData {
  product: string;
  name: string;
  email: string;
  contact: string;
  description: string;
  consent: boolean;
}

export interface QuoteApiResponse {
  success: boolean;
  message: string;
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

class QuoteApi {
  async submit(data: QuoteFormData): Promise<QuoteApiResponse> {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('[QuoteApi] EmailJS is not configured.');
      throw new Error(
        'Email service is not configured. Please contact support.',
      );
    }

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          product: data.product,
          name: data.name,
          email: data.email,
          contact: data.contact,
          description: data.description,
        },
        EMAILJS_PUBLIC_KEY,
      );

      if (result.status !== 200) {
        console.error(
          '[QuoteApi] EmailJS returned error:',
          result.status,
          result.text,
        );
        throw new Error(
          'Something went wrong while sending your enquiry. Please try again.',
        );
      }

      console.log('[QuoteApi] Quote submitted successfully', result);
      return { success: true, message: 'Enquiry sent successfully' };
    } catch (err) {
      console.error('[QuoteApi] EmailJS submission error:', err);
      throw new Error('Unable to send your enquiry. Please try again.');
    }
  }
}

export const quoteApi = new QuoteApi();
