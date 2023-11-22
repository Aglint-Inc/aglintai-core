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
            name: 'getDetails',
            parameters: {
              type: 'object',
              properties: {
                candidate_name: {
                  type: 'string',
                  description: 'Candidate name',
                },
                candidate_email: {
                  type: 'string',
                  description: 'Candidate email',
                },
                candidate_phone: {
                  type: 'string',
                  description: 'Candidate number',
                },
              },
              required: ['candidate_email'],
            },
            description: 'Get the candidate details',
          },
        },
        {
          name: 'chatEnd',
          parameters: {
            type: 'object',
            properties: {
              chat_end: {
                type: 'boolean',
                description: 'true',
              },
            },
            required: ['chat_end'],
          },
          description: 'Close conversation',
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
