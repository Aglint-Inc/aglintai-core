import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  throw new Error('Missing OpenAI API key');
}

export const openai = new OpenAI({
  apiKey: openaiApiKey,
});
