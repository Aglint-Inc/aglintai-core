import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '../../../trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = ctx.db;
  return (
    await db
      .from('departments')
      .select()
      .eq('recruiter_id', ctx.recruiter_id)
      .throwOnError()
  ).data;
};

export const departments = privateProcedure.query(query);

export type AllDepartments = ProcedureDefinition<typeof departments>;
