import createChatMessage from "./chatMessage.js";

const createChatMessageList = (initialMessages = []) => {
  const list = document.createElement("div");
  list.classList.add("chat-window__messages");

  const appendMessage = (message) => {
    if (!message) return null;

    const normalizedMessage =
      typeof message === "string" ? { text: message } : { ...message };

    const chatMessage = createChatMessage(normalizedMessage);
    list.appendChild(chatMessage);
    list.scrollTop = list.scrollHeight;
    return chatMessage;
  };

  const clear = () => {
    list.replaceChildren();
  };

  initialMessages.forEach(appendMessage);

  return {
    element: list,
    appendMessage,
    clear,
  };
};

export default createChatMessageList;
