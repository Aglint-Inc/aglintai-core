import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = createPublicClient();
  const { greenhouse_metadata, greenhouse_key } = (
    await db
      .from('integrations')
      .select('greenhouse_metadata, greenhouse_key')
      .eq('recruiter_id', ctx.recruiter_id)
      .single()
      .throwOnError()
  ).data!;
  return {
    last_sync: greenhouse_metadata.last_sync || {},
    options: greenhouse_metadata.options || {},
    key: greenhouse_key,
  };
};

export const get = privateProcedure.query(query);

export type Get = ProcedureDefinition<typeof get>;
