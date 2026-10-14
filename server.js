import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import chatRouter from "./routes/chat.js";
import { serverConfig } from "./serverConfig.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Behind a reverse proxy the client IP comes from X-Forwarded-For; without
// this every visitor shares the proxy's IP and the rate limiter is useless.
app.set("trust proxy", 1);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "embed")));
app.use(cors({ origin: serverConfig.allowedOrigins }));
app.use(express.json({ limit: "2kb" }));

app.get("/", (req, res) => {
  res.status(200).send("Portfolio AI server");
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use("/api/chat", chatRouter);

app.listen(serverConfig.port, () => {
  console.log(`Server is running on port ${serverConfig.port}`);
});
