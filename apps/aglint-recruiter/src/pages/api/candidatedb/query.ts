import { type NextApiRequest, type NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = req.body.query;

    if (!query) return res.status(400).send('query missing in request body');

    const prompt = [
      {
        role: 'system',
        content: `extract from the given text and respond in this strict json format:{
          person_locations: string[] ( extract city or state or country if mentioned in the text or else empty array),
          person_titles : string[] (extract job title mentioned in the text),
          person_seniorities: enum [entry, senior, manager, director, executive, intern, owner, founder, c_suite, partner, vp, head][](extract seniority mentioned in the text or else empty array),
          companies: string[] (extract company name mentioned in the text or else empty array),
          }.
          
          dont add any place holder state     
          `,
      },
      {
        role: 'user',
        content: `
          text : 
          """ ${query} """.
          `,
      },
    ];

    const chatCompletion = await openai.chat.completions.create({
      messages: prompt as any,
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
