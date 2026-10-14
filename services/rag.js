import openai from "../openAI.js";
import pool from "../db.js";
import { systemPrompt } from "../prompt.js";

const EMBEDDING_MODEL = "text-embedding-3-small";
const CHAT_MODEL = "gpt-5-nano";
const TOP_K = 5;
const MAX_ANSWER_TOKENS = 400;

/** Returns the portfolio passages closest to the question, as one string. */
export async function retrieveContext(message) {
  const { data } = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: message,
  });
  const queryEmbedding = "[" + data[0].embedding.join(",") + "]";

  const { rows } = await pool.query(
    `
    SELECT content
    FROM documents
    ORDER BY embedding <=> $1::vector
    LIMIT $2
    `,
    [queryEmbedding, TOP_K]
  );
  return rows.map((r) => r.content).join("\n---\n");
}

/** Streams the answer; yields text chunks. Aborting `signal` stops the upstream request. */
export async function* streamAnswer(message, context, signal) {
  const stream = await openai.chat.completions.create(
    {
      model: CHAT_MODEL,
      reasoning_effort: "minimal",
      max_completion_tokens: MAX_ANSWER_TOKENS,
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${message}`,
        },
      ],
    },
    { signal }
  );

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}
