import { streamMessage } from "./chatService.js";

const GENERIC_ERROR = "Sorry, I encountered an error. Please try again later.";
// Statuses where the server message is meant for the visitor.
const USER_FACING_STATUSES = [400, 429];

/**
 * Creates the function that sends a user message and renders the streamed reply.
 * @param {Object} callbacks
 * @param {(message: {text: string}) => HTMLElement} callbacks.appendBotMessage
 * @param {() => void} callbacks.onFirstChunk called once the reply starts arriving
 */
export function createMessageHandler({ appendBotMessage, onFirstChunk }) {
  return async (userMessage) => {
    let bubble = null;
    let text = "";

    const render = (value) => {
      text = value;
      if (!bubble) {
        const element = appendBotMessage({ text });
        bubble = element.querySelector(".chat-message__bubble");
        onFirstChunk();
      } else {
        bubble.textContent = text;
      }
    };

    try {
      await streamMessage(userMessage, (chunk) => render(text + chunk));
      if (!bubble) render(GENERIC_ERROR);
    } catch (error) {
      console.error("Message handler error:", error);
      render(USER_FACING_STATUSES.includes(error.status) ? error.message : GENERIC_ERROR);
    }
  };
}
