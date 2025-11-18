/**
 * Message handler service for processing user messages and managing chat responses
 */

import chatService from "./chatService.js";

/**
 * Creates a message handler function for processing user messages
 * @param {Object} callbacks - Callback functions for message handling
 * @param {Function} callbacks.appendBotMessage - Function to append bot messages
 * @param {Function} callbacks.appendUserMessage - Function to append user messages
 * @param {Function} callbacks.appendMessage - Function to append generic messages
 * @param {Function} onError - Optional error handler
 * @returns {Function} Message handler function
 */
export function createMessageHandler(callbacks = {}, onError = null) {
  const { appendBotMessage, appendUserMessage, appendMessage } = callbacks;

  /**
   * Handles a user message by sending it to the API and processing the response
   * @param {string} userMessage - The user's message
   * @returns {Promise<void>}
   */
  const handleMessage = async (userMessage) => {
    if (!userMessage || typeof userMessage !== "string") {
      console.warn("Invalid message provided to message handler");
      return;
    }

    // Note: User message should already be appended to UI by the caller (chatWindow)
    // This handler focuses on API communication and bot response handling

    try {
      // Send message to API
      const response = await chatService.sendMessage(userMessage);

      // Process API response
      if (response && response.message) {
        const botMessage =
          typeof response.message === "string"
            ? { text: response.message, sender: "bot" }
            : { sender: "bot", ...response.message };

        if (appendBotMessage) {
          appendBotMessage(botMessage);
        } else if (appendMessage) {
          appendMessage(botMessage);
        }
      } else {
        // Fallback if response format is unexpected
        const fallbackMessage = {
          text: "I apologize, but I couldn't process your message. Please try again.",
          sender: "bot",
        };

        if (appendBotMessage) {
          appendBotMessage(fallbackMessage);
        } else if (appendMessage) {
          appendMessage(fallbackMessage);
        }
      }
    } catch (error) {
      console.error("Message handler error:", error);

      // Show error message to user
      const errorMessage = {
        text: "Sorry, I encountered an error. Please try again later.",
        sender: "bot",
      };

      if (appendBotMessage) {
        appendBotMessage(errorMessage);
      } else if (appendMessage) {
        appendMessage(errorMessage);
      }

      // Call custom error handler if provided
      if (onError && typeof onError === "function") {
        onError(error, userMessage);
      }
    }
  };

  return handleMessage;
}

/**
 * Default message responder (fallback when no API integration)
 * @param {Object} callbacks - Callback functions
 * @returns {Function} Default responder function
 */
export function createDefaultResponder(callbacks = {}) {
  const { appendBotMessage } = callbacks;

  return () => {
    const defaultMessage = {
      text: "Thanks for reaching out! We'll reply shortly.",
      sender: "bot",
    };

    if (appendBotMessage) {
      appendBotMessage(defaultMessage);
    }
  };
}
