// test_db.js
import pool from "./db.js";

async function main() {
  try {
    console.log("Testing DB connection...");
    const result = await pool.query("select 1 as ok");
    console.log("DB result:", result.rows);
  } catch (err) {
    console.error("DB error:", err);
  } finally {
    await pool.end();
  }
}

main();
