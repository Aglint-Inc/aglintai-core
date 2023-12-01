// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  let details = req.body;
  // console.log(details);
  try {
    const run = await openai.beta.threads.runs.create(details.thread_id, {
      assistant_id: details.assistant_id,
    });
    res.status(200).send(run);
    // console.log(run);
  } catch (error) {
    res.status(200).send(false);
  }
}

// thread_1qI6uKHyUMu5Uniyjbt0Mx9D
