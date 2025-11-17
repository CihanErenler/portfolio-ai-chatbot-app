const createChatHeader = ({
  title = "Need help?",
  subtitle = "",
  status = "",
  avatar = "",
  onClose,
} = {}) => {
  const header = document.createElement("header");
  header.classList.add("chat-window__header");

  const headingGroup = document.createElement("div");
  headingGroup.classList.add("chat-window__heading");

  const avatarElement = document.createElement("div");
  avatarElement.classList.add("chat-window__avatar");

  const resolveInitials = () => {
    if (avatar && typeof avatar === "string") {
      return avatar.trim().slice(0, 2).toUpperCase();
    }

    if (!title) return "AI";

    const segments = title.trim().split(/\s+/).slice(0, 2);
    const initials = segments.map((segment) => segment[0] || "").join("");
    return initials.toUpperCase() || "AI";
  };

  avatarElement.textContent = resolveInitials();

  const titleElement = document.createElement("h2");
  titleElement.classList.add("chat-window__title");
  titleElement.textContent = title;

  const titleGroup = document.createElement("div");
  titleGroup.classList.add("chat-window__title-group");
  titleGroup.appendChild(titleElement);

  if (subtitle) {
    const subtitleElement = document.createElement("p");
    subtitleElement.classList.add("chat-window__subtitle");
    subtitleElement.textContent = subtitle;
    titleGroup.appendChild(subtitleElement);
  }

  if (status) {
    const statusElement = document.createElement("span");
    statusElement.classList.add("chat-window__status");
    statusElement.textContent = status;
    titleGroup.appendChild(statusElement);
  }

  headingGroup.append(avatarElement, titleGroup);

  header.appendChild(headingGroup);

  const actions = document.createElement("div");
  actions.classList.add("chat-window__actions");

  if (typeof onClose === "function") {
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.classList.add("chat-window__close");
    closeButton.setAttribute("aria-label", "Close chat window");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", onClose);
    actions.appendChild(closeButton);
  }

  header.appendChild(actions);

  return header;
};

export default createChatHeader;
