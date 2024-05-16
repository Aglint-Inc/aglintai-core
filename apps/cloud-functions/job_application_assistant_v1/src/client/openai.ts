import dotenv from "dotenv";
import { Custom_OpenAI } from "../models/custom_openai";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ASSISTANT_ID = process.env.ASSISTANT_ID;

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variables are required.");
}
if (!ASSISTANT_ID) {
  throw new Error("ASSISTANT_ID environment variables are required.");
}

const openai = new Custom_OpenAI({
  apiKey: OPENAI_API_KEY,
});

export { ASSISTANT_ID, openai };
