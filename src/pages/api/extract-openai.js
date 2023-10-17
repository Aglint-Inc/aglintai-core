import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  if (req.body.text) {
    try {
      const response = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: req.body.text,
        temperature: 1,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send({ data: null, error: error });
    }
  } else {
    res.status(200).send({ data: null, error: 'text is required in body' });
  }
}
