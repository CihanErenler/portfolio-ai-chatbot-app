import createChatHeader from "./chatHeader.js";
import createChatMessageList from "./chatMessageList.js";
import createChatInput from "./chatInput.js";
import "./chatWindow.style.css";

const DEFAULT_WELCOME_MESSAGE = {
  sender: "bot",
  text: "Hey there! I'm Cihan's AI assistant — ask me anything about my work, projects, or experience.",
};

const createChatWindow = ({
  id = "chat-window",
  title = "Cihan's AI Assistant",
  subtitle = "Ask about my skills, projects, experiences, and more.",
  status = "Online now",
  avatar = "",
  placeholder = "Send a message...",
  initialMessages = [],
  onSend,
  onBeforeOpen,
  onOpen,
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
    initialMessages.length > 0 ? initialMessages : [DEFAULT_WELCOME_MESSAGE]
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

  const defaultResponder = () => {
    appendBotMessage("Thanks for reaching out! We'll reply shortly.");
  };

  const responder = typeof onSend === "function" ? onSend : defaultResponder;

  const handleUserMessage = (value) => {
    appendUserMessage(value);
    try {
      const response = responder(value, {
        appendBotMessage,
        appendMessage: messageList.appendMessage,
        appendUserMessage,
      });

      if (response && typeof response.then === "function") {
        response.catch((error) => {
          console.error("Chat responder error:", error); // eslint-disable-line no-console
        });
      }
    } catch (error) {
      console.error("Chat responder error:", error); // eslint-disable-line no-console
    }
  };

  const handleBeforeOpen =
    typeof onBeforeOpen === "function" ? onBeforeOpen : null;
  const handleOpen = typeof onOpen === "function" ? onOpen : null;
  const handleClose = typeof onClose === "function" ? onClose : null;

  const performOpen = () => {
    chatWindow.classList.remove("chat-window--hidden");
    chatWindow.setAttribute("aria-hidden", "false");
    if (handleOpen) {
      handleOpen();
    }
  };

  const open = () => {
    if (!handleBeforeOpen) {
      performOpen();
      return;
    }

    try {
      const result = handleBeforeOpen();

      if (result && typeof result.then === "function") {
        result
          .then(() => {
            performOpen();
          })
          .catch((error) => {
            console.error("Chat beforeOpen error:", error); // eslint-disable-line no-console
            performOpen();
          });
        return;
      }

      if (typeof result === "number" && Number.isFinite(result) && result > 0) {
        window.setTimeout(() => {
          performOpen();
        }, result);
        return;
      }
    } catch (error) {
      console.error("Chat beforeOpen error:", error); // eslint-disable-line no-console
    }

    performOpen();
  };

  const close = () => {
    chatWindow.classList.add("chat-window--hidden");
    chatWindow.setAttribute("aria-hidden", "true");
    if (handleClose) {
      handleClose();
    }
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
    onClose: close,
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
