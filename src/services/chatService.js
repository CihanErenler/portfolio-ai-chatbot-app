import { API_CONFIG } from "../constants/index.js";

export class ChatError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

/**
 * Sends a message and streams the reply.
 * @param {string} message
 * @param {(chunk: string) => void} onChunk called for every piece of reply text
 */
export async function streamMessage(message, onChunk) {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_CONFIG.CHAT_ENDPOINT}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    }
  );

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ChatError(
      body.message || `HTTP error ${response.status}`,
      response.status
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value, { stream: true }));
  }
}
