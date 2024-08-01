import {ChatOpenAI} from '@langchain/openai';

export const llm = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo-1106',
  temperature: 0,
  apiKey: process.env.OPENAI_APIKEY,
});
