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
      file_ids: ['file-Ofwl364mPJRw0aWb1QgZCtwm'],
      tools: [
        { type: 'code_interpreter' },
        { type: 'retrieval' },
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
              required: ['candidate_email', 'candidate_name'],
            },
            description: 'Get the candidate details',
          },
        },
        {
          type: 'function',
          function: {
            name: 'chatEnd',
            parameters: {
              type: 'object',
              properties: {
                chat_end: {
                  type: 'boolean',
                  description: 'true',
                },
                applied: {
                  type: 'boolean',
                  description:
                    'if candidate is agree to apply name true or false ',
                },
              },
              required: ['chat_end', 'applied'],
            },
            description: 'Close conversation',
          },
        },
        {
          type: 'function',
          function: {
            name: 'getLinkedinDetails',
            description: 'Linkedin url in given',
            parameters: {
              type: 'object',
              properties: {
                linkedin_url: {
                  type: 'string',
                  description: 'true',
                },
              },
              required: ['linkedin_url'],
            },
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
