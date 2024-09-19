import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

const schema = z.object({ job_id: z.string().uuid() });

const query = async ({ ctx, input }: PrivateProcedure<typeof schema>) =>
  (
    await ctx.db
      .rpc('getlocationspool', { jobid: input.job_id })
      .single()
      .throwOnError()
  ).data;

export const locationPool = privateProcedure.input(schema).query(query);
