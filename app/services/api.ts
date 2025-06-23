// Get API base URL from environment variable, fallback to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

// Response types based on your backend API documentation
export interface ModelResponse {
  model: string;
  response: string;
  success: boolean;
}

export interface DatasetResponse {
  intent: string;
  model: string;
  response: string;
  source: string;
  success: boolean;
}

export interface ChatResponse {
  success: boolean;
  dataset?: DatasetResponse;
  dataset_match: boolean;
  models: {
    llama3: ModelResponse;
    mixtral: ModelResponse;
    tinyllama: ModelResponse;
  };
}

export interface SingleModelResponse {
  success: boolean;
  response: string | null;
}

// Enhanced fetch with retry logic for Docker environment
const fetchWithRetry = async (url: string, options: RequestInit, retries = 3): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      if (response.ok || response.status < 500) {
        return response;
      }
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      
      // Exponential backoff with jitter
      const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Max retries exceeded');
};

// API service methods
export const apiService = {
  // Combined chat endpoint
  async chat(input: string): Promise<ChatResponse> {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        body: JSON.stringify({ input }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error in combined chat:', error);
      return {
        success: false,
        dataset_match: false,
        models: {
          llama3: { model: 'llama-3.3-70b-versatile', response: '', success: false },
          mixtral: { model: 'gemma2-9b-it', response: '', success: false },
          tinyllama: { model: 'TinyLLaMA', response: '', success: false },
        },
      };
    }
  },

  // Individual model endpoints
  async llama3(input: string): Promise<SingleModelResponse> {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/api/llama3`, {
        method: 'POST',
        body: JSON.stringify({ input }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error in LLaMA 3 chat:', error);
      return { success: false, response: null };
    }
  },

  async mixtral(input: string): Promise<SingleModelResponse> {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/api/mixtral`, {
        method: 'POST',
        body: JSON.stringify({ input }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error in Mixtral chat:', error);
      return { success: false, response: null };
    }
  },

  async tinyllama(input: string): Promise<SingleModelResponse> {
    try {
      const response = await fetchWithRetry(`${API_BASE_URL}/api/tinyllama`, {
        method: 'POST',
        body: JSON.stringify({ input }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error in TinyLLaMA chat:', error);
      return { success: false, response: null };
    }
  },
};

export default apiService; 