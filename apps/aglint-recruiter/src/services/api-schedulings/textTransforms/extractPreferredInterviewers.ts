import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const interviewersSchema = z.object({
  interviewers: z
    .object({
      full_name: z.string(),
      user_id: z.string(),
    })
    .array(),
});
export const extractPreferredInterviewers = async ({
  interviewer,
  agent_instruction,
}: {
  agent_instruction: string;
  interviewer: z.infer<typeof interviewersSchema>;
}) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
  });
  const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o-2024-08-06',
    messages: [
      {
        role: 'system',
        content:
          `Identify and extract only the interviewer present in the below interviewers list and given user input \n` +
          `
            Inteviewers List:
            ${JSON.stringify(interviewer)}
          `,
      },
      {
        role: 'user',
        content: `Here is the user input ""${agent_instruction}""`,
      },
    ],
    response_format: zodResponseFormat(interviewersSchema, 'interviewers_data'),
    temperature: 0.2,
  });
  const interviewers = completion.choices[0].message.parsed;
  return interviewers;
};
