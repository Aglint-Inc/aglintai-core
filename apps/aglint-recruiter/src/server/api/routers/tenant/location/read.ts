import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '../../../trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = ctx.db;
  return (
    await db
      .from('office_locations')
      .select('*')
      .eq('recruiter_id', ctx.recruiter_id)
      .throwOnError()
  ).data;
};

export const locations = privateProcedure.query(query);

export type ReadLocations = ProcedureDefinition<typeof locations>;
