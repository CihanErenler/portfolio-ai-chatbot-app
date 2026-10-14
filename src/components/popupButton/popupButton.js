import "./popupButton.style.css";

// Chat bubble with a terminal prompt; drawn in currentColor so it follows the theme.
const ICON_SVG = `
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
  <path d="M7.5 8.5 10.5 11l-3 2.5" />
  <path d="M12.5 13.5h4" />
</svg>`;

const createPopupButton = () => {
  const button = document.createElement("button");
  button.classList.add("popup-button");
  button.type = "button";
  button.setAttribute("aria-label", "Open chat window");
  button.setAttribute("title", "Chat with Portfolio AI");
  button.innerHTML = ICON_SVG;
  return button;
};

export default createPopupButton;
