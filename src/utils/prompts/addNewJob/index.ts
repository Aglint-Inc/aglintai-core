import axios from 'axios';

import { MessageType } from '../types';

export const getAIResponse = async (prompts: MessageType[]) => {
  const { data } = await axios.post('/api/ai/gpt3-5-turbo', {
    prompts,
  });

  return data;
};
