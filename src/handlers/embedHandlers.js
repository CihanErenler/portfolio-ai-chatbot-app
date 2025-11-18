/**
 * Event handlers for iframe embed communication
 */

import { EMBED_CONFIG } from "../constants/index.js";
import postMessageService from "../services/postMessageService.js";

/**
 * Creates a handler for processing state messages from parent window
 * @param {Function} onOpen - Handler to open the chat window
 * @param {Function} onClose - Handler to close the chat window
 * @returns {Function} Event listener function
 */
export function createStateMessageHandler(onOpen, onClose) {
  return (data) => {
    if (data.open) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };
}

/**
 * Sets up all embed-related message handlers
 * @param {Object} config - Configuration object
 * @param {Function} config.onOpen - Handler to open the chat window
 * @param {Function} config.onClose - Handler to close the chat window
 * @param {Function} config.onToggle - Handler to toggle the chat window (unused, kept for API compatibility)
 * @returns {Function} Cleanup function to remove event listeners
 */
export function setupEmbedHandlers({ onOpen, onClose, onToggle }) {
  const stateHandler = createStateMessageHandler(onOpen, onClose);

  const messageHandler = (event) => {
    const { data } = event;

    if (!postMessageService.isValidMessage(event)) {
      return;
    }

    if (data.type === EMBED_CONFIG.STATE_MESSAGE_TYPE) {
      stateHandler(data);
    }
  };

  window.addEventListener("message", messageHandler);

  // Return cleanup function
  return () => {
    window.removeEventListener("message", messageHandler);
  };
}
