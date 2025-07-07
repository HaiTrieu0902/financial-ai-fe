import axios from 'axios';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AzureOpenAIResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

class AzureOpenAIService {
  private apiKey: string;
  private endpoint: string;
  private deploymentName: string;
  private apiVersion: string;

  constructor() {
    this.apiKey = process.env.AZURE_OPENAI_API_KEY || '';
    this.endpoint = process.env.AZURE_OPENAI_ENDPOINT || '';
    this.deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o';
    this.apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2025-01-01-preview';
  }

  async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await axios.post<AzureOpenAIResponse>(
        `${this.endpoint}/openai/deployments/${this.deploymentName}/chat/completions?api-version=${this.apiVersion}`,
        {
          messages: [
            {
              role: 'system',
              content: `You are a helpful personal finance assistant. You provide practical, 
              accurate financial advice and help users understand their finances better. 
              Always be supportive and encouraging while being realistic about financial goals.
              Keep responses concise but informative. Format your responses in a friendly, 
              conversational tone.`,
            },
            ...messages,
          ],
          max_tokens: 1000,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': this.apiKey,
          },
        },
      );

      return response.data.choices[0]?.message?.content || "Sorry, I couldn't process your request.";
    } catch (error) {
      console.error('Azure OpenAI API Error:', error);
      throw new Error('Failed to get response from AI assistant');
    }
  }

  async getFinancialAdvice(userQuery: string, financialData?: any): Promise<string> {
    const contextMessage = financialData ? `Here's the user's financial context: ${JSON.stringify(financialData, null, 2)}` : '';

    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: `${contextMessage}\n\nUser question: ${userQuery}`,
      },
    ];

    return this.sendMessage(messages);
  }
}

export const azureOpenAIService = new AzureOpenAIService();
