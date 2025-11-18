import OpenAI from "openai";
import { serverConfig } from "./serverConfig.js";

const openai = new OpenAI({
  apiKey: serverConfig.openaiApiKey,
});

export default openai;
