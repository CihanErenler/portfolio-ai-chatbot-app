import createChatHeader from "./chatHeader.js";
import createChatMessageList from "./chatMessageList.js";
import createChatInput from "./chatInput.js";
import createChatTypingIndicator from "./chatTypingIndicator.js";
import { createMessageHandler } from "../../services/messageHandler.js";
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
    return messageList.appendMessage(normalizedMessage);
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

  const typingIndicator = createChatTypingIndicator();
  typingIndicator.hidden = true;

  let waiting = false;
  const setWaiting = (isWaiting) => {
    if (isWaiting === waiting) return;
    waiting = isWaiting;
    typingIndicator.hidden = !isWaiting;
    typingIndicator.setAttribute("aria-hidden", String(!isWaiting));
    typingIndicator.classList.toggle(
      "chat-window__typing-indicator--visible",
      isWaiting
    );
    messageList.element.classList.toggle(
      "chat-window__messages--typing-active",
      isWaiting
    );
    chatInput.setDisabled(isWaiting);

    if (isWaiting) {
      scrollMessagesToBottom();
    } else {
      chatInput.focus();
    }
  };

  const respond = createMessageHandler({
    appendBotMessage,
    onFirstChunk: () => setWaiting(false),
  });

  const handleUserMessage = async (value) => {
    appendUserMessage(value);
    setWaiting(true);
    try {
      await respond(value);
    } finally {
      setWaiting(false);
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
