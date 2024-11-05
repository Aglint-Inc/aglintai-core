import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '../../trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = ctx.db;
  return (
    await db
      .from('roles')
      .select('id, name')
      .eq('recruiter_id', ctx.recruiter_id)
      .throwOnError()
  ).data;
};

export const roles = privateProcedure.query(query);

export type Roles = ProcedureDefinition<typeof roles>;
