import createPopupButton from "./components/popupButton/popupButton.js";
import createChatWindow from "./components/chat/chatWindow.js";
import "./styles.css";

const EMBED_SOURCE = "personal-ai-chat";
const STATE_MESSAGE_TYPE = "personal-ai-chat:state";
const COMMAND_MESSAGE_TYPE = "personal-ai-chat:command";
const EMBED_TRANSITION_DELAY = 280;

const isEmbedded = window.parent !== window;

const postChatState = (open) => {
  if (!isEmbedded) return;

  window.parent.postMessage(
    {
      source: EMBED_SOURCE,
      type: STATE_MESSAGE_TYPE,
      open: Boolean(open),
    },
    "*"
  );
};

const startApp = () => {
  const popupButton = createPopupButton();
  let chatWindow;
  let pendingStateSyncTimeout = null;

  const clearPendingStateSyncTimeout = () => {
    if (pendingStateSyncTimeout) {
      window.clearTimeout(pendingStateSyncTimeout);
      pendingStateSyncTimeout = null;
    }
  };

  const handleBeforeOpen = () => {
    popupButton.setAttribute("aria-expanded", "true");
    popupButton.classList.add("popup-button--hidden");
    clearPendingStateSyncTimeout();
    postChatState(true);
    return isEmbedded ? EMBED_TRANSITION_DELAY : 0;
  };

  const handleOpen = () => {
    if (chatWindow) {
      chatWindow.focusInput();
    }
  };

  const handleClose = () => {
    popupButton.setAttribute("aria-expanded", "false");
    clearPendingStateSyncTimeout();

    const syncState = () => {
      postChatState(false);
      popupButton.classList.remove("popup-button--hidden");
      popupButton.focus();
    };

    const delay = isEmbedded ? EMBED_TRANSITION_DELAY : 0;

    if (delay > 0) {
      pendingStateSyncTimeout = window.setTimeout(() => {
        pendingStateSyncTimeout = null;
        syncState();
      }, delay);
    } else {
      syncState();
    }
  };

  chatWindow = createChatWindow({
    onBeforeOpen: handleBeforeOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    fullSize: isEmbedded,
  });

  popupButton.setAttribute("aria-haspopup", "dialog");
  popupButton.setAttribute("aria-expanded", "false");
  popupButton.setAttribute("aria-controls", chatWindow.element.id);

  popupButton.addEventListener("click", () => {
    chatWindow.toggle();
  });

  if (isEmbedded) {
    window.addEventListener("message", (event) => {
      const { data } = event;
      if (
        !data ||
        data.source !== EMBED_SOURCE ||
        data.type !== COMMAND_MESSAGE_TYPE
      ) {
        return;
      }

      if (data.command === "open") {
        chatWindow.open();
      } else if (data.command === "close") {
        chatWindow.close();
      } else if (data.command === "toggle") {
        chatWindow.toggle();
      }
    });
  }

  document.body.appendChild(chatWindow.element);
  document.body.appendChild(popupButton);

  postChatState(false);

  const handleDocumentClick = (event) => {
    const target = event.target;
    if (chatWindow.element.contains(target) || popupButton.contains(target)) {
      return;
    }

    if (!chatWindow.element.classList.contains("chat-window--hidden")) {
      chatWindow.close();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key !== "Escape") return;
    if (chatWindow.element.classList.contains("chat-window--hidden")) return;
    chatWindow.close();
  };

  document.addEventListener("click", handleDocumentClick);
  window.addEventListener("keydown", handleKeyDown);

  window.addEventListener("message", (event) => {
    const { data } = event;
    console.log(data);

    if (!data || data.source !== EMBED_SOURCE) return;

    if (data.type === STATE_MESSAGE_TYPE) {
      if (data.open) {
        chatWindow.open();
      } else {
        chatWindow.close();
      }
    }
  });
};

startApp();
