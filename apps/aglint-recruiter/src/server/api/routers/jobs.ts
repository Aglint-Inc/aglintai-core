import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const jobsRouter = createTRPCRouter({
  read: publicProcedure
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
