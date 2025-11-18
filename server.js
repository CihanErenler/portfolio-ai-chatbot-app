import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import openai from "./openAI.js";
import pool from "./db.js";
import rateLimit from "express-rate-limit";
import { serverConfig } from "./serverConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = serverConfig.port;
const allowedOrigin = serverConfig.allowedOrigin;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "embed")));
app.use(cors(allowedOrigin));
app.use(express.json());
app.use(limiter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  console.time("chat:total");
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ message: "Message is required" });
    }
    console.time("chat:embedding");
    const embeddings = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: message,
    });
    console.timeEnd("chat:embedding");
    const queryEmbedding = embeddings.data[0].embedding;
    const queryEmbeddingStr = "[" + queryEmbedding.join(",") + "]";

    console.time("chat:db");
    const { rows } = await pool.query(
      `
      SELECT
        title,
        content,
        1 - (embedding <=> $1::vector) AS similarity
      FROM documents
      ORDER BY embedding <=> $1::vector
      LIMIT 3
      `,
      [queryEmbeddingStr]
    );
    console.timeEnd("chat:db");
    const contextText = rows.map((r) => r.content).join("\n---\n");

    const systemPrompt = `
You are Cihan's personal portfolio assistant.

You only answer questions about Cihan, their skills, experience, and projects, using the context provided.

Rules:
- Answer in at most 3-4 short sentences, unless the user explicitly asks for more detail.
- Do NOT invent facts that are not in the context.
- If the answer is not in the context, say: "I'm not sure — I only know what's in Cihan's portfolio data."
- Keep the tone clear, friendly, and professional.
- Do not repeat the question, and avoid long introductions or conclusions.
`;

    console.time("chat:completion");
    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Context:\n${contextText}\n\nQuestion: ${message}`,
        },
      ],
    });
    console.timeEnd("chat:completion");
    res.status(200).json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error in chat API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
