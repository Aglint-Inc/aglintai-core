import { dayjsLocal, ScheduleUtils } from '@aglint/shared-utils';
import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const TimeSchema = z.object({
  startTime: z.string().describe('24 hour HH:MM format'),
  endTime: z.string().describe('24 hour HH:MM format'),
});

const candidateAvailabilitySchema = z
  .object({
    prefferredTime: TimeSchema,
    preferredDates: z.object({
      startDate: z.string().describe('date in DD/MM/YYYY'),
      endDate: z.string().describe('date in DD/MM/YYYY'),
    }),
  })
  .nullable();

export const agentSelfScheduleInstruction = z.object({
  candidateAvailability: candidateAvailabilitySchema,
  maxTotalSlots: z.number(),
  includeAllSoftConflictSlots: z.boolean(),
  overrideSoftConflicts: z.array(z.string()),
  include_outside_working_hours: z.boolean(),
});

export const schema = z.object({
  instruction: z.string(),
  user_tz: z.string(),
});

export const selfScheduleLinkInstruction = async ({
  instruction,
  user_tz,
  default_preferred_dates,
}: {
  instruction: string;
  user_tz: string;
  default_preferred_dates: {
    startDate: string;
    endDate: string;
  };
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
                "prefferredTime": {
                  "startTime": "09:00",
                  "endTime": "17:00"
                },
                "preferredDates": {
                  startDate: ${default_preferred_dates.startDate},
                  endDate: ${default_preferred_dates.endDate}
                }
              },
              "maxTotalSlots": 10,
              "includeAllSoftConflictSlots": true,
              "overrideSoftConflicts": [],
              "include_outside_working_hours": false
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
  const pref_dates =
    availability.candidateAvailability.preferredDates ??
    default_preferred_dates;
  const formatOutput: z.infer<typeof agentSelfScheduleInstruction> = {
    ...availability,
    candidateAvailability: {
      prefferredTime: {
        startTime: dayjsLocal()
          .tz(user_tz)
          .set(
            'hour',
            Number(
              availability.candidateAvailability.prefferredTime.startTime.split(
                ':',
              )[0],
            ),
          )
          .set(
            'minute',
            Number(
              availability.candidateAvailability.prefferredTime.startTime.split(
                ':',
              )[1],
            ),
          )
          .format(),
        endTime: dayjsLocal()
          .tz(user_tz)
          .set(
            'hour',
            Number(
              availability.candidateAvailability.prefferredTime.endTime.split(
                ':',
              )[0],
            ),
          )
          .set(
            'minute',
            Number(
              availability.candidateAvailability.prefferredTime.endTime.split(
                ':',
              )[1],
            ),
          )
          .format(),
      },
      preferredDates: {
        startDate: ScheduleUtils.convertDateFormatToDayjs(
          pref_dates.startDate,
          user_tz,
        ).format(),
        endDate: ScheduleUtils.convertDateFormatToDayjs(
          pref_dates.endDate,
          user_tz,
        ).format(),
      },
    },
  };
  return formatOutput;
};
