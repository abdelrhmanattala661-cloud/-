import { Citation } from '../types/chat';

const API_URL = import.meta.env.VITE_API_URL;

export interface ChatRequest {
  question: string;
  conversation_id?: string;
}

export interface ChatResponse {
  answer: string;
  citations?: Citation[];
  conversation_id: string;
}

export const api = {
  async chat(request: ChatRequest): Promise<ChatResponse> {
    // Isolated Mock Data for UI demonstration when real backend isn't connected
    if (!API_URL) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            answer: `This is a simulated AI response to your question: "${request.question}".\n\nBreast cancer is a disease in which cells in the breast grow out of control. There are different kinds of breast cancer. The kind of breast cancer depends on which cells in the breast turn into cancer.\n\nScreening recommendations vary depending on age and risk factors. According to the USPSTF, women should discuss screening intervals with their healthcare provider.`,
            conversation_id: request.conversation_id || `conv-${Date.now()}`,
            citations: [
              {
                document_id: 'USPSTF-2024',
                title: 'Breast Cancer Screening Recommendation',
                organization: 'USPSTF',
                published_date: '2024',
                page: 12,
                chunk_id: 'CH-001',
                evidence: 'The USPSTF recommends biennial screening mammography for women aged 40 to 74 years.',
                url: 'https://www.uspreventiveservicestaskforce.org'
              }
            ]
          });
        }, 1500);
      });
    }

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the medical assistant.');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
}
