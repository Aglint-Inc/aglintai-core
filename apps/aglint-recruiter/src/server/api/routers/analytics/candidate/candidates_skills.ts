import { z } from 'zod';

import { privateProcedure } from '../../../trpc';

const body = z.object({
  recruiter_id: z.string().uuid(),
  job_id: z.string().optional().nullable(),
  departments: z.number().array().optional().nullable(),
  locations: z.number().array().optional().nullable(),
  data_range: z
    .object({ from: z.date(), to: z.date() })
    .optional()
    .nullable()
    .default({
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(new Date().setHours(23, 59, 59, 999)),
    }),
});

export const candidates_skills = privateProcedure
  .input(body)
  .query(async ({ input, ctx: { adminDb } }) => {
    const { recruiter_id, data_range, departments, job_id, locations } = input;
    const data = (
      await adminDb
        .rpc('candidate_skills_analysis', {
          recruiter_id: recruiter_id,
          jobs: job_id ? [job_id] : undefined,
          departments: departments || undefined,
          locations: locations || undefined,
          start_datetime: data_range?.from.toISOString(),
          end_datetime: data_range?.to.toISOString(),
        })
        .throwOnError()
    ).data;
    return data;
  });