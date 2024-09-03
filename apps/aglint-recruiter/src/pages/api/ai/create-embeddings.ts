import { type NextApiRequest, type NextApiResponse } from 'next';
import OpenAI from 'openai';

import { tokenMeter } from '@/src/utils/tokenCounter';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.body.text) {
      const embedding = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: req.body.text,
      });
      tokenMeter({
        tokenUsage: { ...embedding.usage, completion_tokens: 0 },
        company_name: 'embeddings',
        model: 'text-embedding-ada-002',
        usageLocation: 'embedding',
      });
      return res.status(200).json(embedding);
    } else {
      res.status(400).send('No text provided');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
