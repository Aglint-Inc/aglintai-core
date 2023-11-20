// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  let details = req.body;

  try {
    const myMessages = await openai.beta.threads.messages.list(
      details.thread_id,
      {
        limit: 100,
      },
    );
    res.status(200).send(myMessages.data);
  } catch (error) {
    // console.log(error);
    return error;
  }
}
