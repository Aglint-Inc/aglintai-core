// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  let details = req.body;
  if (details.file_details) {
    try {
      const threadMessages = await openai.beta.threads.messages.create(
        details.thread_id,
        {
          role: 'user',
          content: details.message,
          file_ids: [details.file_details.id],
          metadata: {
            file_name: details.file_details.filename,
            file_id: details.file_details.id,
            file_path: details.resume_file,
          },
        },
      );

      res.status(200).send(threadMessages);
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    try {
      const threadMessages = await openai.beta.threads.messages.create(
        details.thread_id,
        {
          role: 'user',
          content: details.message,
        },
      );

      // console.log(threadMessages);
      res.status(200).send(threadMessages);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

// thread_1qI6uKHyUMu5Uniyjbt0Mx9D
