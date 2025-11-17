import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "embed")));
app.use(cors("*"));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/chat", (req, res) => {
  const { message } = req.body;
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
