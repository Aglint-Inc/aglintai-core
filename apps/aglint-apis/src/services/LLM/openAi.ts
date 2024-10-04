import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_APIKEY;

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variables are required.');
}

export const getOpenAi = () =>
  new OpenAI({
    apiKey: OPENAI_API_KEY,
  });
