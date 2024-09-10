import { dayjsLocal } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const DateSchema = z.object({
  startDate: z.object({
    month: z.number().int(),
    year: z.number().int(),
    day: z.number().int(),
  }),
  endDate: z.object({
    month: z.number().int(),
    year: z.number().int(),
    day: z.number().int(),
  }),
});

const TimeSchema = z.object({
  startTime: z.string().describe('24 hour HH:MM format'),
  endTime: z.string().describe('24 hour HH:MM format'),
});

const candidateAvailabilitySchema = z.object({
  prefferredDate: DateSchema.nullable(),
  prefferredTime: TimeSchema,
});

export const AiResponseSchema = z.object({
  candidateAvailability: candidateAvailabilitySchema,
  prefferredInterviewers: z.array(z.string()),
  maxTotalSlots: z.number(),
  includeAllSoftConflictSlots: z.boolean(),
  overrideSoftConflicts: z.array(z.string()),
});

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const instruction = _req.body.instruction;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_KEY,
    });
    const company_tz = 'Asia/Colombo';

    const completion = await openai.beta.chat.completions.parse({
      model: 'gpt-4o-2024-08-06',
      messages: [
        {
          role: 'system',
          content: `Extract the candidate availability information .current date time is ${dayjsLocal().tz(company_tz).format('DD MMM YYYY HH:mm')}`,
        },
        {
          role: 'user',
          content: instruction,
        },
      ],
      response_format: zodResponseFormat(
        AiResponseSchema,
        'candidateAvailability',
      ),
    });

    const event = completion.choices[0].message.parsed;

    res.status(200).json({ response: event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
