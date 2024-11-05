import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '../../trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = ctx.db;
  return (
    await db
      .from('workflow_view')
      .select()
      .order('created_at')
      .eq('recruiter_id', ctx.recruiter_id)
      .eq('workflow_type', 'company')
  ).data;
};

export const read = privateProcedure.query(query);

export type Read = ProcedureDefinition<typeof read>;
