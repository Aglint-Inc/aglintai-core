// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  // let details = req.body;
  try {
    const myAssistants = await openai.beta.assistants.list();
    res.status(200).send(myAssistants.data);
    // console.log(myAssistants.data);
  } catch (error) {
    // console.log(error);
    return error;
  }
}
