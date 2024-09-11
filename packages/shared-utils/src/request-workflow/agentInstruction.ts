import { z } from 'zod';

const DateSchema = z
  .object({
    startDate: z.string().describe('date in unix timestamp format'),
    endDate: z.string().describe('date in unix timestamp format'),
  })
  .optional();

const TimeSchema = z.object({
  startTime: z.string().describe('24 hour HH:MM format'),
  endTime: z.string().describe('24 hour HH:MM format'),
});

const candidateAvailabilitySchema = z.object({
  prefferredDate: DateSchema,
  prefferredTime: TimeSchema,
});

export const agentSelfScheduleInstruction = z.object({
  candidateAvailability: candidateAvailabilitySchema,
  prefferredInterviewers: z.array(z.string()),
  maxTotalSlots: z.number(),
  includeAllSoftConflictSlots: z.boolean(),
  overrideSoftConflicts: z.array(z.string()),
});
