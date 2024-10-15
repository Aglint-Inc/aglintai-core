import { z } from 'zod';

import { createPublicClient } from '@/server/db';

import { privateProcedure, type ProcedureDefinition } from '../../trpc';

const body = z.object({
  recruiter_id: z.string().uuid(),
  job_id: z.string().optional().nullable(),
  department_id: z.number().optional().nullable(),
  location_id: z.number().optional().nullable(),
  data_range: z
    .object({ from: z.date(), to: z.date() })
    .optional()
    .nullable()
    .default({
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(new Date().setHours(23, 59, 59, 999)),
    }),
});

export const interview_count = privateProcedure
  .input(body)
  .query(async ({ input }) => {
    const adminDb = createPublicClient();
    const { recruiter_id, data_range, department_id, job_id, location_id } =
      input;

    let query = adminDb
      .from('interview_meeting')
      .select('created_at,status,public_jobs!inner()');
    if (recruiter_id) {
      query = query.eq('recruiter_id', recruiter_id);
    }
    if (data_range && data_range.from && data_range.to) {
      query = query
        .gte('created_at', data_range?.from)
        .lte('created_at', data_range?.to);
    }
    if (job_id) {
      query = query.eq('job_id', job_id);
    }
    if (department_id) {
      query = query.eq('public_jobs.department_id', department_id);
    }
    if (location_id) {
      query = query.eq('public_jobs.location_id', location_id);
    }
    const result = (await query.throwOnError()).data;
    return result;
  });

export type InterviewCount = ProcedureDefinition<typeof interview_count>;
