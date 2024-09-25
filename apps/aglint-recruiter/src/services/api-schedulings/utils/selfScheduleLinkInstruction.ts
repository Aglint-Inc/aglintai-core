import { type ZodInferSchema } from '@aglint/shared-types';
import { agentSelfScheduleInstruction, dayjsLocal } from '@aglint/shared-utils';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

export const schema = z.object({
  instruction: z.string(),
  user_tz: z.string(),
});

export const selfScheduleLinkInstruction = async ({
  input: { instruction, user_tz },
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
          `Extract the candidate availability information from the given below candidate availability [ do not include placeholder information], current date time is ${dayjsLocal().tz(user_tz).format('DD MMM YYYY HH:mm')}\n` +
          `
            if any of the information is missing use information from below
      {
        "candidateAvailability": {
            "prefferredDate": null,
          },
          "prefferredTime": {
            "startTime": "09:00",
            "endTime": "17:00"
            }
          },
          "prefferredInterviewers": [],
          "maxTotalSlots": 5,
          "includeAllSoftConflictSlots": false,
          "overrideSoftConflicts": [],
          include_outside_working_hours: false
      }
          `,
      },
      {
        role: 'user',
        content: `Here is the candidate availability information: ${instruction}`,
      },
    ],
    response_format: zodResponseFormat(
      agentSelfScheduleInstruction,
      'candidateAvailability',
    ),
    temperature: 0.3,
  });

  const availability = completion.choices[0].message.parsed;

  return availability as ZodInferSchema<typeof agentSelfScheduleInstruction>;
};
