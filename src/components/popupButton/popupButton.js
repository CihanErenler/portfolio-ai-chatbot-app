import iconSrc from "../../assets/chatbot-icon.png";
import createIcon from "../../utils/createIcon.js";
import "./popupButton.style.css";

const createPopupButton = () => {
  const icon = createIcon(iconSrc);
  const button = document.createElement("button");
  button.classList.add("popup-button");
  button.type = "button";
  button.setAttribute("aria-label", "Open chat window");
  button.setAttribute("title", "Chat with Portfolio AI");
  button.appendChild(icon);
  return button;
};

export default createPopupButton;
