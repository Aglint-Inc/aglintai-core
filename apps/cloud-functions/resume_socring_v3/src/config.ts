import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Anthropic from "@anthropic-ai/sdk";

import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables are required."
  );
}
if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variables are required.");
}
export const supabase = createClient(supabaseUrl, supabaseKey);

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

export const gemini = new GoogleGenerativeAI(GEMINI_API_KEY as string);
