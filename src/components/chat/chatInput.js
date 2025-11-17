const createChatInput = ({
  placeholder = "Type a message...",
  onSend,
} = {}) => {
  const form = document.createElement("form");
  form.classList.add("chat-window__input");
  form.setAttribute("novalidate", "");

  const input = document.createElement("input");
  input.type = "text";
  input.name = "message";
  input.autocomplete = "off";
  input.placeholder = placeholder;
  input.classList.add("chat-window__text-field");

  const sendButton = document.createElement("button");
  sendButton.type = "submit";
  sendButton.classList.add("chat-window__send");
  sendButton.textContent = "Send";
  sendButton.setAttribute("aria-label", "Send message");
  sendButton.setAttribute("title", "Send message");

  form.append(input, sendButton);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = input.value.trim();
    if (!value) return;

    if (typeof onSend === "function") {
      onSend(value);
    }

    input.value = "";
    input.focus();
  });

  return {
    element: form,
    focus: () => input.focus(),
  };
};

export default createChatInput;
