import { z } from 'zod';

import { createTRPCRouter, privateProcedure } from '../trpc';

export const jobsRouter = createTRPCRouter({
  read: privateProcedure
    .input(z.object({ recruiter_id: z.string().uuid() }))
    .query(
      async ({ ctx: { db }, input: { recruiter_id } }) =>
        (
          await db
            .from('public_jobs')
            .select('*')
            .eq('recruiter_id', recruiter_id)
            .throwOnError()
        ).data,
    ),
});
