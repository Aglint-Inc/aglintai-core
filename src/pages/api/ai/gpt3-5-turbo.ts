import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

import { MessageType } from '@/src/utils/prompts/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

type bodyParams = {
  prompts: MessageType[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { prompts } = req.body as bodyParams;
    if (!prompts)
      return res.status(400).send('prompts missing in request body');

    const chatCompletion = await openai.chat.completions.create({
      messages: prompts,
      model: 'gpt-3.5-turbo',
    });

    return res.status(200).json(chatCompletion.choices[0].message.content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
