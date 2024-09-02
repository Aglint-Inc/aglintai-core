import { type NextApiRequest, type NextApiResponse } from 'next';
import OpenAI from 'openai';

import { tokenMeter } from '@/src/utils/tokenCounter';

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
      model: 'gpt-3.5-turbo-0125',
      temperature: 1,
      response_format: {
        type: 'json_object',
      },
    });

    tokenMeter({
      tokenUsage: chatCompletion.usage,
      company_name: 'JobCreationjsonExtraction',
      model: 'gpt-3.5-turbo-1106',
      usageLocation: 'jsonExtraction',
    });
    chatCompletion.usage;
    return res.status(200).json(chatCompletion.choices[0].message.content);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
