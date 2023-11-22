import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { prompts } = req.body;
    if (!prompts)
      return res.status(400).send('prompts missing in request body');

    const chatCompletion = await openai.chat.completions.create({
      messages: prompts as any,
      model: 'gpt-3.5-turbo-1106',
      temperature: 1,
      response_format: {
        type: 'json_object',
      },
    });

    return res.status(200).json(chatCompletion.choices[0].message.content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
