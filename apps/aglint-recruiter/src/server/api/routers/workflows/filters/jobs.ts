import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx: { recruiter_id } }: PrivateProcedure) => {
  const db = await createPrivateClient();
  return (
    await db
      .rpc('get_job_workflows', {
        recruiter_id,
      })
      .throwOnError()
  ).data;
};

export const jobs = privateProcedure.query(query);

export type Jobs = ProcedureDefinition<typeof jobs>;
