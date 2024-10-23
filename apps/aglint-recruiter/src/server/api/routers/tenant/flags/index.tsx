import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = await createPrivateClient();
  return (
    await db
      .from('recruiter_preferences')
      .select(`*`)
      .eq('recruiter_id', ctx.recruiter_id)
      .single()
      .throwOnError()
  ).data!;
};

export const flags = privateProcedure.query(query);

export type Flags = ProcedureDefinition<typeof flags>;
