import { Router } from "express";
import rateLimit from "express-rate-limit";
import { retrieveContext, streamAnswer } from "../services/rag.js";
import { serverConfig } from "../serverConfig.js";

const MAX_MESSAGE_LENGTH = 300;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  message: { message: "Too many requests, please try again later." },
});

// Global daily cap so bot traffic can never run up the OpenAI bill.
let budget = { day: "", used: 0 };
const takeDailyBudget = () => {
  const day = new Date().toISOString().slice(0, 10);
  if (budget.day !== day) budget = { day, used: 0 };
  if (budget.used >= serverConfig.dailyRequestLimit) return false;
  budget.used += 1;
  return true;
};

const router = Router();

router.post("/", limiter, async (req, res) => {
  const message =
    typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({
      message: `Message must be at most ${MAX_MESSAGE_LENGTH} characters`,
    });
  }
  if (!takeDailyBudget()) {
    return res.status(429).json({
      message: "The demo has reached its daily limit. Please come back tomorrow.",
    });
  }

  const abort = new AbortController();
  res.on("close", () => abort.abort());

  try {
    const context = await retrieveContext(message);

    res.status(200).type("text/plain; charset=utf-8");
    res.flushHeaders();
    for await (const delta of streamAnswer(message, context, abort.signal)) {
      res.write(delta);
    }
    res.end();
  } catch (error) {
    if (abort.signal.aborted) return;
    console.error("Error in chat API:", error);
    if (res.headersSent) return res.end();
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
