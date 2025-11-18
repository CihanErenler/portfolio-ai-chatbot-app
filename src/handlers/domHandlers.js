/**
 * DOM event handlers for user interactions
 */

/**
 * Creates a click handler that closes the chat when clicking outside
 * @param {HTMLElement} chatWindowElement - The chat window DOM element
 * @param {HTMLElement} popupButton - The popup button DOM element
 * @param {Function} onClose - Callback to close the chat window
 * @returns {Function} Event listener function
 */
export function createOutsideClickHandler(chatWindowElement, popupButton, onClose) {
  return (event) => {
    const target = event.target;

    // Don't close if clicking inside the chat window or popup button
    if (
      chatWindowElement.contains(target) ||
      popupButton.contains(target)
    ) {
      return;
    }

    // Close if chat window is currently open
    if (!chatWindowElement.classList.contains("chat-window--hidden")) {
      onClose();
    }
  };
}

/**
 * Creates a keyboard handler for Escape key to close chat
 * @param {HTMLElement} chatWindowElement - The chat window DOM element
 * @param {Function} onClose - Callback to close the chat window
 * @returns {Function} Event listener function
 */
export function createEscapeKeyHandler(chatWindowElement, onClose) {
  return (event) => {
    if (event.key !== "Escape") return;

    // Only close if chat window is currently open
    if (chatWindowElement.classList.contains("chat-window--hidden")) return;

    onClose();
  };
}

/**
 * Sets up all DOM event handlers
 * @param {Object} config - Configuration object
 * @param {HTMLElement} config.chatWindowElement - The chat window DOM element
 * @param {HTMLElement} config.popupButton - The popup button DOM element
 * @param {Function} config.onClose - Callback to close the chat window
 * @returns {Function} Cleanup function to remove event listeners
 */
export function setupDOMHandlers({ chatWindowElement, popupButton, onClose }) {
  const clickHandler = createOutsideClickHandler(
    chatWindowElement,
    popupButton,
    onClose
  );
  const keyHandler = createEscapeKeyHandler(chatWindowElement, onClose);

  document.addEventListener("click", clickHandler);
  window.addEventListener("keydown", keyHandler);

  // Return cleanup function
  return () => {
    document.removeEventListener("click", clickHandler);
    window.removeEventListener("keydown", keyHandler);
  };
}

