import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

const schema = z.object({ job_id: z.string().uuid() });

const query = async ({ ctx, input }: PrivateProcedure<typeof schema>) =>
  (
    await ctx.db
      .rpc('get_interview_schedule_by_job_id', { target_job_id: input.job_id })
      .throwOnError()
  ).data;

export const scheduleData = privateProcedure.input(schema).query(query);
