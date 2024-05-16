import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv";

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables are required."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Anthropic client
import Anthropic from "@anthropic-ai/sdk";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY environment variables are required.");
}

export const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});

// openAi client
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variables are required.");
}

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// PLM client

const { TextServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const PLM_REFRESH_TOKEN = process.env.PLM_REFRESH_TOKEN;
if (!PLM_REFRESH_TOKEN) {
  throw new Error("PLM_REFRESH_TOKEN environment variables are required.");
}

export const plmClient = new TextServiceClient({
  authClient: new GoogleAuth({
    credentials: {
      client_id:
        "716127335237-ibnpoa3movp4hbpakjv3jevo89fdpb0p.apps.googleusercontent.com",
      client_secret: "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",
      refresh_token: PLM_REFRESH_TOKEN,
      type: "authorized_user",
    },
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  }),
});
