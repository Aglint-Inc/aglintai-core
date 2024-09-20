import axios from 'axios';

import { type MessageType } from '../types';

export const getAIResponse = async (prompts: MessageType[]) => {
  const { data } = await axios.post('/api/ai/gpt3-5-turbo', {
    prompts,
  });

  return data;
};

export const extractJson = async (prompts: MessageType[]) => {
  const { data } = await axios.post(
    '/api/ai/queryToJson',
    {
      prompts,
    },
    {
      timeout: 10000,
    },
  );

  return data;
};
