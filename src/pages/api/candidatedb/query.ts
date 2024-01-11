import { NextApiRequest, NextApiResponse } from 'next';
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
          person_locations: string[] ( extract city if mentioned in the text orelse empty array),
          person_seniorities : enums ("senior", "manager")
          person_titles : string[],
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
