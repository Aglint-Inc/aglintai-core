// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  let details = req.body;
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0301',
    messages: details.context,
  });
  // console.log(
  //   'dheerajjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',
  //   completion
  // );
  res.send({
    response: completion.choices[0].message,
    token: completion['usage']['total_tokens'],
  });
}
