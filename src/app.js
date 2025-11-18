import createPopupButton from "./components/popupButton/popupButton.js";
import createChatWindow from "./components/chat/chatWindow.js";
import { EMBED_CONFIG } from "./constants/index.js";
import postMessageService from "./services/postMessageService.js";
import StateManager from "./utils/stateManager.js";
import { setupEmbedHandlers } from "./handlers/embedHandlers.js";
import { setupDOMHandlers } from "./handlers/domHandlers.js";
import "./styles.css";

/**
 * Initializes the chat application
 */
const startApp = () => {
  const popupButton = createPopupButton();
  const stateManager = new StateManager();
  const isEmbedded = postMessageService.getIsEmbedded();

  // Create chat window - handlers defined below
  let handleOpen;
  let handleClose;

  const chatWindow = createChatWindow({
    onClose: () => handleClose?.(),
    fullSize: isEmbedded,
  });

  /**
   * Handles opening the chat window with app-level state management
   */
  handleOpen = () => {
    popupButton.setAttribute("aria-expanded", "true");
    popupButton.classList.add("popup-button--hidden");
    stateManager.clearPendingTimeout();
    postMessageService.postChatState(true);

    const delay = stateManager.getTransitionDelay(
      isEmbedded,
      EMBED_CONFIG.TRANSITION_DELAY
    );

    stateManager.executeWithDelay(() => {
      chatWindow.open();
      chatWindow.focusInput();
    }, delay);
  };

  /**
   * Handles closing the chat window with app-level state management
   */
  handleClose = () => {
    chatWindow.close();
    popupButton.setAttribute("aria-expanded", "false");
    stateManager.clearPendingTimeout();

    const syncState = () => {
      postMessageService.postChatState(false);
      popupButton.classList.remove("popup-button--hidden");
      popupButton.focus();
    };

    const delay = stateManager.getTransitionDelay(
      isEmbedded,
      EMBED_CONFIG.TRANSITION_DELAY
    );

    stateManager.executeWithDelay(syncState, delay);
  };

  const handleToggle = () => {
    if (chatWindow.element.classList.contains("chat-window--hidden")) {
      handleOpen();
    } else {
      handleClose();
    }
  };

  // Set up popup button ARIA attributes
  popupButton.setAttribute("aria-haspopup", "dialog");
  popupButton.setAttribute("aria-expanded", "false");
  popupButton.setAttribute("aria-controls", chatWindow.element.id);

  // Handle popup button clicks
  popupButton.addEventListener("click", handleToggle);

  // Set up embed handlers if embedded
  if (isEmbedded) {
    setupEmbedHandlers({
      onOpen: handleOpen,
      onClose: handleClose,
      onToggle: handleToggle,
    });
  }

  // Append elements to DOM
  document.body.appendChild(chatWindow.element);
  document.body.appendChild(popupButton);

  // Post initial state
  postMessageService.postChatState(false);

  // Set up DOM event handlers (click outside, escape key)
  setupDOMHandlers({
    chatWindowElement: chatWindow.element,
    popupButton,
    onClose: handleClose,
  });
};

startApp();
