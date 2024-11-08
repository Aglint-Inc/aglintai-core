import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const schema = z.object({
  location_id: z.number(),
});

const query = async ({ input, ctx }: PrivateProcedure<typeof schema>) => {
  const db = ctx.db;
  const location = (
    await db
      .from('office_locations')
      .select('*,recruiter_user(first_name,last_name)')
      .eq('id', input.location_id)
      .eq('recruiter_id', ctx.recruiter_id)
      .single()
  ).data!;

  if (!location)
    throw new TRPCError({
      code: 'UNPROCESSABLE_CONTENT',
      message: 'Location not found',
    });

  const jobs = (
    await db
      .from('public_jobs')
      .select('job_title')
      .eq('location_id', input.location_id)
  ).data!;

  const jobUsage = (jobs ?? []).map((job) => job.job_title);
  const userUsage = location.recruiter_user;

  return { location_id: input.location_id, jobUsage, userUsage };
};

export const deleteLocationUsage = privateProcedure.input(schema).query(query);

export type DeleteLocation = ProcedureDefinition<typeof deleteLocationUsage>;
