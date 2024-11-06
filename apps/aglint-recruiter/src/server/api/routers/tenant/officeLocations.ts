import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '../../trpc';

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

export const officeLocations = privateProcedure.query(query);

export type OfficeLocations = ProcedureDefinition<typeof officeLocations>;
