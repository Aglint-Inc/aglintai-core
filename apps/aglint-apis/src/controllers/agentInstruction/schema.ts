import z from 'zod';

const DateSchema = z.object({
  startDate: z.object({
    month: z.number().int().min(1).max(12),
    year: z.number().int(),
    day: z.number().int().min(1).max(31),
  }),
  endDate: z.object({
    month: z.number().int().min(1).max(12),
    year: z.number().int(),
    day: z.number().int().min(1).max(31),
  }),
});

const TimeSchema = z.object({
  startTime: z.string().describe('24 hour HH:MM format').default('08:00'),
  endTime: z.string().describe('24 hour HH:MM format').default('18:00'),
});

const candidateAvailabilitySchema = z
  .object({
    prefferredDate: DateSchema.nullable(),
    prefferredTime: TimeSchema,
  })
  .default({});

export const AiResponseSchema = z.object({
  candidateAvailability: candidateAvailabilitySchema,
  prefferredInterviewers: z.array(z.string()),
  maxTotalSlots: z.number(),
  includeAllSoftConflictSlots: z.boolean(),
  overrideSoftConflicts: z.array(z.unknown()),
});
