/**
 * Application-wide constants
 */

export const EMBED_CONFIG = {
  SOURCE: "personal-ai-chat",
  STATE_MESSAGE_TYPE: "personal-ai-chat:state",
  TRANSITION_DELAY: 200,
};

export const CHAT_CONFIG = {
  DEFAULT_TITLE: "Cihan's AI Assistant",
  DEFAULT_SUBTITLE: "Ask about my skills, projects, experiences, and more.",
  DEFAULT_STATUS: "Online now",
  DEFAULT_PLACEHOLDER: "Send a message...",
  DEFAULT_WELCOME_MESSAGE: {
    sender: "bot",
    text: "Hey there! I'm Cihan's AI assistant — ask me anything about my work, projects, or experience.",
  },
};

export const API_CONFIG = {
  BASE_URL: "http://localhost:3000",
  CHAT_ENDPOINT: "/api/chat",
};
