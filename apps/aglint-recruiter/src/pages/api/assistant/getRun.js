// run_2I8OXUhBEV0VDrGtAgegMxvJ

// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  let details = req.body;
  try {
    const run = await openai.beta.threads.runs.retrieve(
      details.thread_id,
      details.run_id,
    );
    res.status(200).send(run);
    // console.log(myAssistants.data);
  } catch (error) {
    // console.log(error);
    return error;
  }
}
