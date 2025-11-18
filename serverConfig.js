import dotenv from "dotenv";
dotenv.config();

export const serverConfig = {
  port: process.env.PORT || 3000,
  openaiApiKey: process.env.OPENAI_API_KEY,
  pgConnectionString: process.env.PG_CONNECTION_STRING,
  chatWidgetUrl: process.env.CHAT_WIDGET_URL,
  allowedOrigin: process.env.ALLOWED_ORIGIN,
};
