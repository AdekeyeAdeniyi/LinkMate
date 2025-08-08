import { ChatCompletionResponse, ChatMessageResponse, Replica } from "../components/types";

export interface ReplicaResponse {
  items: Replica[];
}

class ReplicaService {
  private baseUrl = "/api";

  async getReplicas(): Promise<Replica[]> {
    try {
      const response = await fetch(`${this.baseUrl}/replica`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Replica: ${errorText}`);
      }

      const data: ReplicaResponse = await response.json();
      return data.items || data || [];
    } catch (error) {
      console.error("Error fetching replica data:", error);
      throw error;
    }
  }

  async getReplicaById(ownerID?: string, id?: string): Promise<Replica | undefined> {
    if (ownerID && id) {
      const response = await fetch(`${this.baseUrl}/replica/chat/${ownerID}/${id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Replica: ${errorText}`);
      }
      return response.json();
    }
  }
  async getChatCompletion(ownerID?: string, id?: string, message?: string): Promise<ChatCompletionResponse | undefined> {
    if (ownerID && id) {
      const response = await fetch(`${this.baseUrl}/replica/chat/${ownerID}/${id}`, { method: "POST", body: JSON.stringify({ content: message, skip_chat_history: false, source: "web" }) });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Replica: ${errorText}`);
      }
      return response.json();
    }
  }
  async getChatHistory(ownerID?: string, id?: string): Promise<ChatMessageResponse | undefined> {
    if (ownerID && id) {
      const response = await fetch(`${this.baseUrl}/replica/chat/${ownerID}/${id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Replica: ${errorText}`);
      }
      return response.json();
    }
  }
}

export const replicaService = new ReplicaService();
