import { z } from 'zod';

import { createPublicClient } from '@/server/db';

import { privateProcedure } from '../../trpc';

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

export const interview_decline = privateProcedure
  .input(body)
  .query(async ({ input }) => {
    const adminDb = createPublicClient();
    const { recruiter_id, data_range, department_id, job_id, location_id } =
      input;

    let query = adminDb
      .from('interview_session_cancel')
      .select(
        'created_at, interview_session!inner(interview_meeting!inner(public_jobs!inner(id, department_id, location_id)))',
      );
    if (recruiter_id) {
      query = query.eq(
        'interview_session.interview_meeting.recruiter_id',
        recruiter_id,
      );
    }
    if (data_range && data_range.from && data_range.to) {
      query = query
        .gte('created_at', data_range?.from)
        .lte('created_at', data_range?.to);
    }
    if (job_id) {
      query = query.eq(
        'interview_session.interview_meeting.public_jobs.id',
        job_id,
      );
    }
    if (department_id) {
      query = query.eq(
        'interview_session.interview_meeting.public_jobs.department_id',
        department_id,
      );
    }
    if (location_id) {
      query = query.eq(
        'interview_session.interview_meeting.public_jobs.location_id',
        location_id,
      );
    }
    const result = (await query.throwOnError()).data.map((item) => ({
      created_at: item.created_at,
      status: 'cancelled',
    }));
    return result;
  });
