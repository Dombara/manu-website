import { quoteApi, type QuoteFormData, type QuoteApiResponse } from '../api/quoteApi';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s\-()]{7,20}$/;

export class QuoteService {
  async submit(data: QuoteFormData): Promise<QuoteApiResponse> {
    const trimmed = {
      product: data.product.trim(),
      name: data.name.trim(),
      email: data.email.trim(),
      contact: data.contact.trim(),
      description: data.description.trim(),
      consent: data.consent,
    };

    if (!trimmed.product) throw new Error('Please select a product.');
    if (!trimmed.name) throw new Error('Please provide your full name.');
    if (!trimmed.email || !EMAIL_REGEX.test(trimmed.email)) {
      throw new Error('Please provide a valid email address.');
    }
    if (!trimmed.contact || !PHONE_REGEX.test(trimmed.contact)) {
      throw new Error('Please provide a valid contact number.');
    }
    if (!trimmed.consent) throw new Error('You must agree to be contacted.');

    return quoteApi.submit(trimmed);
  }
}

export const quoteService = new QuoteService();
