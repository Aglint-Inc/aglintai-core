// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  let details = req.body;
  try {
    const assistant = await openai.beta.assistants.update(
      details.assistant_id,
      {
        instructions: details.instructions,
        name: details.name,
      },
    );

    res.status(200).send(assistant);
  } catch (error) {
    // console.log(error);
    return error;
  }
}

// thread_1qI6uKHyUMu5Uniyjbt0Mx9D
