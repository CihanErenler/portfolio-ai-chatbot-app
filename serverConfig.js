import dotenv from "dotenv";
dotenv.config();

export const serverConfig = {
  port: process.env.PORT || 3000,
  openaiApiKey: process.env.OPENAI_API_KEY,
  pgConnectionString: process.env.PG_CONNECTION_STRING,
  chatWidgetUrl: process.env.CHAT_WIDGET_URL,
  // Comma-separated list. Unset means no cross-origin access (same-origin only).
  allowedOrigins: process.env.ALLOWED_ORIGIN
    ? process.env.ALLOWED_ORIGIN.split(",").map((o) => o.trim())
    : false,
  dailyRequestLimit: Number(process.env.DAILY_REQUEST_LIMIT) || 500,
};
