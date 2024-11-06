import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = ctx.db;
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
