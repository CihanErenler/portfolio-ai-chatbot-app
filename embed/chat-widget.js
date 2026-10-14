(function () {
  // Avoid double-loading
  if (window.__cihanChatWidgetLoaded) return;
  window.__cihanChatWidgetLoaded = true;

  var EMBED_SOURCE = "personal-ai-chat";
  var STATE_MESSAGE_TYPE = "personal-ai-chat:state";
  var THEME_MESSAGE_TYPE = "personal-ai-chat:theme";

  function createChatIframe() {
    var scriptTag = document.currentScript;

    // URL where your chat app (iframe UI) lives
    var chatUrl =
      scriptTag.getAttribute("data-chat-url") ||
      "https://assistant.cihanapps.dev"; // change to your real URL

    // Optional positioning option
    var position =
      scriptTag.getAttribute("data-chat-position") || "bottom-right";

    var collapsedWidth =
      scriptTag.getAttribute("data-chat-collapsed-width") || "80px";
    var collapsedHeight =
      scriptTag.getAttribute("data-chat-collapsed-height") || "80px";
    var expandedWidth =
      scriptTag.getAttribute("data-chat-width") ||
      "min(420px, calc(100vw - 32px))";
    var expandedHeight =
      scriptTag.getAttribute("data-chat-height") ||
      "min(820px, calc(100vh - 82px))";

    var chatOrigin = new URL(chatUrl, location.href).origin;

    var iframe = document.createElement("iframe");
    iframe.id = "cihan-chat-widget-iframe";
    iframe.src = chatUrl;

    // Base styles for the iframe widget
    iframe.style.position = "fixed";
    iframe.style.border = "none";
    iframe.style.borderRadius = "12px";
    iframe.style.transition = "width 0.2s ease, height 0.2s ease";
    iframe.style.zIndex = "999999"; // on top of almost everything

    function applyCollapsedState() {
      iframe.style.width = collapsedWidth;
      iframe.style.height = collapsedHeight;
      iframe.style.maxWidth = collapsedWidth;
      iframe.style.maxHeight = collapsedHeight;
      iframe.dataset.chatState = "closed";
    }

    function applyExpandedState() {
      iframe.style.width = expandedWidth;
      iframe.style.height = expandedHeight;
      iframe.style.maxWidth = expandedWidth;
      iframe.style.maxHeight = expandedHeight;
      iframe.dataset.chatState = "open";
    }

    function updateIframeState(isOpen) {
      if (isOpen) {
        applyExpandedState();
      } else {
        applyCollapsedState();
      }
    }

    // iframe.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";

    // Position around the screen
    if (position === "bottom-right") {
      iframe.style.bottom = "20px";
      iframe.style.right = "20px";
    } else if (position === "bottom-left") {
      iframe.style.bottom = "16px";
      iframe.style.left = "16px";
    } else if (position === "top-right") {
      iframe.style.top = "16px";
      iframe.style.right = "16px";
    } else if (position === "top-left") {
      iframe.style.top = "16px";
      iframe.style.left = "16px";
    }

    document.body.appendChild(iframe);

    updateIframeState(false);

    window.addEventListener("message", function (event) {
      if (event.source !== iframe.contentWindow) return;
      var data = event.data;
      if (!data || data.source !== EMBED_SOURCE) return;

      if (data.type === STATE_MESSAGE_TYPE) {
        updateIframeState(Boolean(data.open));
      }
    });

    // Mirror the host page's theme (a "dark"/"light" class or data-theme on
    // <html>, falling back to the browser preference) into the chat UI.
    function getHostTheme() {
      var root = document.documentElement;
      var attr = root.getAttribute("data-theme");
      if (attr === "dark" || attr === "light") return attr;
      if (root.classList.contains("dark")) return "dark";
      if (root.classList.contains("light")) return "light";
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    function sendTheme() {
      if (!iframe.contentWindow) return;
      iframe.contentWindow.postMessage(
        { source: EMBED_SOURCE, type: THEME_MESSAGE_TYPE, theme: getHostTheme() },
        chatOrigin
      );
    }

    iframe.addEventListener("load", sendTheme);
    new MutationObserver(sendTheme).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    // Ask the chat UI to close when the visitor clicks elsewhere on the host page.
    document.addEventListener("click", function (event) {
      if (iframe.dataset.chatState !== "open" || iframe.contains(event.target))
        return;
      iframe.contentWindow.postMessage(
        { source: EMBED_SOURCE, type: STATE_MESSAGE_TYPE, open: false },
        chatOrigin
      );
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createChatIframe);
  } else {
    createChatIframe();
  }
})();
