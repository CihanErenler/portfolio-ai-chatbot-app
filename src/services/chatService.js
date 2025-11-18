/**
 * Chat service for handling API communication with the backend
 */

import { API_CONFIG } from "../constants/index.js";

class ChatService {
  constructor(baseUrl = API_CONFIG.BASE_URL) {
    this.baseUrl = baseUrl;
    this.endpoint = `${baseUrl}${API_CONFIG.CHAT_ENDPOINT}`;
  }

  /**
   * Sends a message to the chat API
   * @param {string} message - The user's message
   * @param {Object} options - Additional options for the request
   * @returns {Promise<Object>} - The response from the API
   */
  async sendMessage(message, options = {}) {
    if (!message || typeof message !== "string") {
      throw new Error("Message must be a non-empty string");
    }

    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify({
          message: message.trim(),
          ...options.body,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("ChatService.sendMessage error:", error);
      throw error;
    }
  }

  /**
   * Sends a streaming message (if supported by backend)
   * @param {string} message - The user's message
   * @param {Function} onChunk - Callback for each chunk received
   * @param {Object} options - Additional options
   * @returns {Promise<void>}
   */
  async sendStreamingMessage(message, onChunk, options = {}) {
    // Future implementation for streaming support
    throw new Error("Streaming not yet implemented");
  }
}

// Export singleton instance
const chatService = new ChatService();

export default chatService;
export { ChatService };

