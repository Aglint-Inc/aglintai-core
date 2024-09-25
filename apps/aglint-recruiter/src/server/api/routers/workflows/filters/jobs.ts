import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx: { recruiter_id } }: PrivateProcedure) => {
  const db = createPrivateClient();
  return (
    await db
      .rpc('get_job_workflows', {
        recruiter_id,
      })
      .throwOnError()
  ).data;
};

export const jobs = privateProcedure.query(query);
