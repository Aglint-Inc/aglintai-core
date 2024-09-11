/* eslint-disable no-console */
import type { ZodInferSchema } from '@aglint/shared-types';
import { agentSelfScheduleInstruction, dayjsLocal } from '@aglint/shared-utils';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

import { privateProcedure } from '@/server/api/trpc';

import { type PrivateProcedure } from '../../trpc';

export const schema = z.object({
  instruction: z.string(),
  user_tz: z.string(),
});

const mutation = async ({
  input: { instruction, user_tz },
}: PrivateProcedure<typeof schema>) => {
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
          "overrideSoftConflicts": []
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

  return availability as ZodInferSchema<typeof agentSelfScheduleInstruction>; // choose either type or schema
};

export const selfScheduleInstruction = privateProcedure
  .input(schema)
  .mutation(mutation);
