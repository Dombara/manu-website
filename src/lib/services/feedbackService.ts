import {
  feedbackApi,
  type FeedbackFormData,
  type ApiResponse,
} from '../api/feedbackApi';

class FeedbackService {
  /**
   * Handles validation and formatting before calling the API layer.
   */
  async submitFeedback(formData: FeedbackFormData): Promise<ApiResponse> {
    try {
      const sanitizedData: FeedbackFormData = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      if (!sanitizedData.message) {
        throw new Error('Please enter your feedback before sending.');
      }

      const response = await feedbackApi.sendMessage(sanitizedData);
      return response;
    } catch (error: unknown) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      console.error('[FeedbackService]: Error occurred!', {
        message: errorObj.message,
        stack: errorObj.stack,
      });

      throw error;
    }
  }
}

export const feedbackService = new FeedbackService();
