const VALID_SENDERS = ["bot", "user", "system"];

const createChatMessage = ({
  text = "",
  sender = "bot",
  timestamp = "",
  status = "",
} = {}) => {
  const resolvedSender = VALID_SENDERS.includes(sender) ? sender : "bot";

  const messageWrapper = document.createElement("div");
  messageWrapper.classList.add(
    "chat-message",
    `chat-message--${resolvedSender}`
  );

  const bubble = document.createElement("div");
  bubble.classList.add("chat-message__bubble");
  bubble.textContent = text;
  messageWrapper.appendChild(bubble);

  if (timestamp || status) {
    const meta = document.createElement("div");
    meta.classList.add("chat-message__meta");

    if (timestamp) {
      const timeElement = document.createElement("span");
      timeElement.classList.add("chat-message__timestamp");
      timeElement.textContent = timestamp;
      meta.appendChild(timeElement);
    }

    if (status) {
      const statusElement = document.createElement("span");
      statusElement.classList.add("chat-message__status");
      statusElement.textContent = status;
      meta.appendChild(statusElement);
    }

    messageWrapper.appendChild(meta);
  }

  return messageWrapper;
};

export default createChatMessage;
