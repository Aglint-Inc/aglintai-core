import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

export type OpenAi = typeof openai.chat.completions.create;
