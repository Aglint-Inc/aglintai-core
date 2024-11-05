import { TRPCError } from '@trpc/server';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = ctx.db;
  const jobs = (
    await db
      .from('public_jobs')
      .select('id, job_title')
      .eq('recruiter_id', ctx.recruiter_id)
      .throwOnError()
  ).data;
  if (!jobs)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Jobs not found',
    });
  return jobs;
};

export const jobs = privateProcedure.query(query);

export type Jobs = ProcedureDefinition<typeof jobs>;
