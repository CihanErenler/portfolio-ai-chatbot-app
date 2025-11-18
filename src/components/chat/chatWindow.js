import createChatHeader from "./chatHeader.js";
import createChatMessageList from "./chatMessageList.js";
import createChatInput from "./chatInput.js";
import { CHAT_CONFIG } from "../../constants/index.js";
import "./chatWindow.style.css";

const createChatWindow = ({
  id = "chat-window",
  title = CHAT_CONFIG.DEFAULT_TITLE,
  subtitle = CHAT_CONFIG.DEFAULT_SUBTITLE,
  status = CHAT_CONFIG.DEFAULT_STATUS,
  avatar = "",
  placeholder = CHAT_CONFIG.DEFAULT_PLACEHOLDER,
  initialMessages = [],
  onSend,
  onClose,
  fullSize = false,
} = {}) => {
  const chatWindow = document.createElement("section");
  chatWindow.id = id;
  chatWindow.classList.add("chat-window", "chat-window--hidden");
  chatWindow.setAttribute("role", "dialog");
  chatWindow.setAttribute("aria-live", "polite");
  chatWindow.setAttribute("aria-label", title);
  chatWindow.setAttribute("aria-hidden", "true");

  if (fullSize) {
    chatWindow.classList.add("chat-window--full");
  }

  const messageList = createChatMessageList(
    initialMessages.length > 0
      ? initialMessages
      : [CHAT_CONFIG.DEFAULT_WELCOME_MESSAGE]
  );

  const appendBotMessage = (message) => {
    const normalizedMessage =
      typeof message === "string"
        ? { text: message, sender: "bot" }
        : { sender: "bot", ...message };
    messageList.appendMessage(normalizedMessage);
  };

  const appendUserMessage = (message) => {
    const normalizedMessage =
      typeof message === "string"
        ? { text: message, sender: "user" }
        : { sender: "user", ...message };
    messageList.appendMessage(normalizedMessage);
  };

  /**
   * Default responder when no onSend handler is provided
   */
  const defaultResponder = () => {
    appendBotMessage("Thanks for reaching out! We'll reply shortly.");
  };

  /**
   * Message responder - uses provided onSend handler or defaults
   */
  const responder = typeof onSend === "function" ? onSend : defaultResponder;

  /**
   * Handles user messages by appending to UI and processing through responder
   */
  const handleUserMessage = (value) => {
    // Message will be appended by the responder if it uses callbacks
    // Otherwise, append user message immediately for immediate UI feedback
    appendUserMessage(value);

    try {
      const response = responder(value, {
        appendBotMessage,
        appendMessage: messageList.appendMessage,
        appendUserMessage,
      });

      // Handle async responses
      if (response && typeof response.then === "function") {
        response.catch((error) => {
          console.error("Chat responder error:", error); // eslint-disable-line no-console
        });
      }
    } catch (error) {
      console.error("Chat responder error:", error); // eslint-disable-line no-console
    }
  };

  const open = () => {
    chatWindow.classList.remove("chat-window--hidden");
    chatWindow.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    chatWindow.classList.add("chat-window--hidden");
    chatWindow.setAttribute("aria-hidden", "true");
  };

  const toggle = () => {
    if (chatWindow.classList.contains("chat-window--hidden")) {
      open();
    } else {
      close();
    }
  };

  const chatHeader = createChatHeader({
    title,
    subtitle,
    status,
    avatar,
    onClose: onClose || close,
  });

  const chatInput = createChatInput({
    placeholder,
    onSend: handleUserMessage,
  });

  chatWindow.append(chatHeader, messageList.element, chatInput.element);

  return {
    element: chatWindow,
    open,
    close,
    toggle,
    focusInput: () => chatInput.focus(),
    appendMessage: messageList.appendMessage,
    appendUserMessage,
    appendBotMessage,
    clearMessages: messageList.clear,
  };
};

export default createChatWindow;
