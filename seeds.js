import "dotenv/config";
import openai from "./openAI.js";
import pool from "./db.js";
import docs from "./docs.js";

function toVectorString(arr) {
  // pgvector expects '[0.1,0.2,...]'
  return "[" + arr.join(",") + "]";
}

async function main() {
  for (const doc of docs) {
    console.log("Embedding:", doc.title);

    const embRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: doc.content,
    });

    const embedding = embRes.data[0].embedding;
    const embeddingStr = toVectorString(embedding);

    await pool.query(
      `
      INSERT INTO documents (title, content, embedding)
      VALUES ($1, $2, $3::vector)
      ON CONFLICT (title) DO UPDATE
      SET content = EXCLUDED.content,
          embedding = EXCLUDED.embedding
      `,
      [doc.title, doc.content, embeddingStr]
    );

    console.log("Upserted:", doc.title);
  }

  // Remove rows for documents that no longer exist in docs.js (renamed or deleted).
  const { rowCount } = await pool.query(
    "DELETE FROM documents WHERE title <> ALL($1::text[])",
    [docs.map((d) => d.title)]
  );
  console.log(`Removed ${rowCount} stale document(s).`);

  await pool.end();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
