// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  //   let details = req.body;
  try {
    const emptyThread = await openai.beta.threads.create();
    res.status(200).send(emptyThread);
  } catch (error) {
    // console.log(error);
    return error
  }
}

// thread_1qI6uKHyUMu5Uniyjbt0Mx9D
