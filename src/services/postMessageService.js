/**
 * PostMessage service for handling communication between iframe and parent window
 */

import { EMBED_CONFIG } from "../constants/index.js";

class PostMessageService {
  constructor() {
    this.isEmbedded = window.parent !== window;
    this.source = EMBED_CONFIG.SOURCE;
  }

  /**
   * Checks if the application is running in an embedded context
   * @returns {boolean}
   */
  getIsEmbedded() {
    return this.isEmbedded;
  }

  /**
   * Posts chat state to parent window
   * @param {boolean} open - Whether the chat is open or closed
   */
  postChatState(open) {
    if (!this.isEmbedded) return;

    window.parent.postMessage(
      {
        source: this.source,
        type: EMBED_CONFIG.STATE_MESSAGE_TYPE,
        open: Boolean(open),
      },
      "*"
    );
  }

  /**
   * Creates a message handler for processing incoming postMessages
   * @param {Function} onStateMessage - Handler for state messages
   * @returns {Function} Event listener function
   */
  createMessageHandler(onStateMessage) {
    return (event) => {
      const { data } = event;

      if (!data || data.source !== this.source) {
        return;
      }

      if (data.type === EMBED_CONFIG.STATE_MESSAGE_TYPE && onStateMessage) {
        onStateMessage(data);
      }
    };
  }

  /**
   * Validates if a message event is from a trusted source
   * @param {MessageEvent} event - The message event
   * @returns {boolean}
   */
  isValidMessage(event) {
    const { data } = event;
    return (
      data &&
      data.source === this.source &&
      data.type === EMBED_CONFIG.STATE_MESSAGE_TYPE
    );
  }
}

// Export singleton instance
const postMessageService = new PostMessageService();

export default postMessageService;
export { PostMessageService };
