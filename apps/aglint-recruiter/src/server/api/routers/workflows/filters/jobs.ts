import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = ctx.db;
  return (
    await db
      .rpc('get_job_workflows', {
        recruiter_id: ctx.recruiter_id,
      })
      .throwOnError()
  ).data;
};

export const jobs = privateProcedure.query(query);

export type Jobs = ProcedureDefinition<typeof jobs>;
