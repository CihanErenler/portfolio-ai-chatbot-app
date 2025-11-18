import createChatHeader from "./chatHeader.js";
import createChatMessageList from "./chatMessageList.js";
import createChatInput from "./chatInput.js";
import createChatTypingIndicator from "./chatTypingIndicator.js";
import { createMessageHandler } from "../../services/messageHandler.js";
import { CHAT_CONFIG } from "../../constants/index.js";
import "./chatWindow.style.css";

const FORCE_TYPING_INDICATOR_VISIBLE = false; // TODO: disable when testing completes

const isPromiseLike = (value) =>
  Boolean(
    value &&
      (typeof value === "object" || typeof value === "function") &&
      typeof value.then === "function"
  );

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

  const scrollMessagesToBottom = () => {
    const listElement = messageList.element;
    if (!listElement) return;
    listElement.scrollTop = listElement.scrollHeight;
  };

  const messageContext = {
    appendBotMessage,
    appendUserMessage,
    appendMessage: messageList.appendMessage,
  };

  const defaultResponder = createMessageHandler(messageContext);

  const responder =
    typeof onSend === "function"
      ? (userMessage) => onSend(userMessage, messageContext)
      : defaultResponder;

  let pendingResponses = 0;

  const typingIndicator = createChatTypingIndicator();
  typingIndicator.setAttribute("aria-hidden", "true");
  typingIndicator.hidden = true;

  const updateTypingIndicatorVisibility = () => {
    const isVisible = FORCE_TYPING_INDICATOR_VISIBLE || pendingResponses > 0;
    typingIndicator.hidden = !isVisible;
    typingIndicator.setAttribute("aria-hidden", String(!isVisible));
    typingIndicator.classList.toggle(
      "chat-window__typing-indicator--visible",
      isVisible
    );
    messageList.element.classList.toggle(
      "chat-window__messages--typing-active",
      isVisible
    );

    if (isVisible) {
      scrollMessagesToBottom();
    }
  };

  const startWaitingForResponse = () => {
    pendingResponses += 1;
    updateTypingIndicatorVisibility();
  };

  const finishWaitingForResponse = () => {
    pendingResponses = Math.max(0, pendingResponses - 1);
    updateTypingIndicatorVisibility();
  };

  updateTypingIndicatorVisibility();

  /**
   * Handles user messages by appending to UI and processing through responder
   */
  const handleUserMessage = (value) => {
    appendUserMessage(value);

    let response;

    try {
      response = responder(value, messageContext);
    } catch (error) {
      console.error("Chat responder error:", error); // eslint-disable-line no-console
      return undefined;
    }

    if (isPromiseLike(response)) {
      startWaitingForResponse();

      Promise.resolve(response)
        .catch((error) => {
          console.error("Chat responder error:", error); // eslint-disable-line no-console
        })
        .finally(() => {
          finishWaitingForResponse();
        });
    }

    return response;
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

  chatWindow.append(
    chatHeader,
    messageList.element,
    typingIndicator,
    chatInput.element
  );

  return {
    element: chatWindow,
    open,
    close,
    toggle,
    focusInput: () => chatInput.focus(),
    clearMessages: messageList.clear,
  };
};

export default createChatWindow;
