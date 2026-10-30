import { contactApi, type ContactFormData, type ApiResponse } from '../api/contactApi';

class ContactService {
  /**  
   * Handles validation and formatting before calling the API layer.
   */
  async sendContactMessage(formData: ContactFormData): Promise<ApiResponse> {
    try {
      const sanitizedData: ContactFormData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        company: formData.company?.trim(),
      };

      if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.subject) {
        throw new Error("Please fill in all required fields.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitizedData.email)) {
        throw new Error("Please enter a valid email address.");
      }

      const response = await contactApi.sendMessage(sanitizedData);
      return response;

    } catch (error: unknown) {
      /**
       * Error Handling Strategy:
       * We log the error for developers here, but throw the error message
       * so the UI (toast) can show a user-friendly string.
       */
      const errorObj = error instanceof Error ? error : new Error(String(error));
      console.error('[ContactService]: Error occurred!', {
        message: errorObj.message,
        stack: errorObj.stack,
      });

      // Rethrow so the ContactPage's catch block can catch it and show the toast
      throw error;
    }
  }
}

// Singleton instance to be used across the app
export const contactService = new ContactService();