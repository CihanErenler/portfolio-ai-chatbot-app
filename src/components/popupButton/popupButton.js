import createIcon from "../../utils/createIcon.js";
import "./popupButton.style.css";

const createPopupButton = () => {
  const icon = createIcon("/src/assets/chatbot-icon.svg");
  const button = document.createElement("button");
  button.classList.add("popup-button");
  button.type = "button";
  button.setAttribute("aria-label", "Open chat window");
  button.setAttribute("title", "Chat with Cihan's AI assistant");
  button.appendChild(icon);
  return button;
};

export default createPopupButton;
