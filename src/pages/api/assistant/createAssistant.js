// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export default async function handler(req, res) {
  let details = req.body;
  try {
    const assistant = await openai.beta.assistants.create({
      instructions: details.instructions,
      name: details.name,
      tools: [
        {
          type: 'function',
          function: {
            name: 'getEmail',
            parameters: {
              type: 'object',
              properties: {
                user_name: {
                  type: 'string',
                  description: 'User name',
                },
                user_email: {
                  type: 'string',
                  description: 'User email',
                },
                user_phone: {
                  type: 'number',
                  description: 'User number',
                },
              },
              required: ['user_email'],
            },
            description: 'Get the user name',
          },
        },
      ],
      model: details.module,
    });

    res.status(200).send(assistant);
  } catch (error) {
    // console.log(error);
    return error;
  }
}

// thread_1qI6uKHyUMu5Uniyjbt0Mx9D
