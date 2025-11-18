const DOT_COUNT = 3;

const createChatTypingIndicator = () => {
  const indicator = document.createElement("div");
  indicator.classList.add("chat-window__typing-indicator");
  indicator.setAttribute("role", "status");
  indicator.setAttribute("aria-live", "polite");
  indicator.setAttribute("aria-label", "Assistant is typing");

  const bubble = document.createElement("div");
  bubble.classList.add("chat-window__typing-indicator-bubble");

  const label = document.createElement("span");
  label.classList.add("chat-window__typing-label");
  label.textContent = "Assistant is typing";

  const dots = document.createElement("div");
  dots.classList.add("chat-window__typing-dots");

  for (let index = 0; index < DOT_COUNT; index += 1) {
    const dot = document.createElement("span");
    dot.classList.add("chat-window__typing-dot");
    dot.style.setProperty("--dot-index", index);
    dots.appendChild(dot);
  }

  bubble.append(label, dots);
  indicator.append(bubble);
  return indicator;
};

export default createChatTypingIndicator;
