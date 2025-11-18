/**
 * State manager utility for handling delayed state synchronization
 */

class StateManager {
  constructor() {
    this.pendingTimeout = null;
  }

  /**
   * Clears any pending timeout
   */
  clearPendingTimeout() {
    if (this.pendingTimeout) {
      window.clearTimeout(this.pendingTimeout);
      this.pendingTimeout = null;
    }
  }

  /**
   * Executes a state change with optional delay
   * @param {Function} callback - Function to execute
   * @param {number} delay - Delay in milliseconds (0 = immediate)
   * @returns {void}
   */
  executeWithDelay(callback, delay = 0) {
    this.clearPendingTimeout();

    if (delay > 0) {
      this.pendingTimeout = window.setTimeout(() => {
        this.pendingTimeout = null;
        callback();
      }, delay);
    } else {
      callback();
    }
  }

  /**
   * Gets the transition delay based on embedded state
   * @param {boolean} isEmbedded - Whether the app is embedded
   * @param {number} delay - The delay value
   * @returns {number}
   */
  getTransitionDelay(isEmbedded, delay) {
    return isEmbedded ? delay : 0;
  }
}

export default StateManager;

