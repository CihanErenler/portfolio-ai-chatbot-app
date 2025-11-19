(function () {
  // Avoid double-loading
  if (window.__cihanChatWidgetLoaded) return;
  window.__cihanChatWidgetLoaded = true;

  var EMBED_SOURCE = "personal-ai-chat";
  var STATE_MESSAGE_TYPE = "personal-ai-chat:state";

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

    document.addEventListener("click", (event) => {
      console.log(iframe.contains(event.target));
      const target = event.target;
      const shouldClose = !iframe.contains(target);
      console.log("shouldClose", shouldClose);
      if (shouldClose) {
        iframe.contentWindow.postMessage(
          {
            source: EMBED_SOURCE,
            type: STATE_MESSAGE_TYPE,
            open: false,
          },
          "*"
        );
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createChatIframe);
  } else {
    createChatIframe();
  }
})();
