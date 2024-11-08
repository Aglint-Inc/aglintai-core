import { officeLocationsUpdateSchema } from '@aglint/shared-types';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const mutation = async ({
  input,
  ctx,
}: PrivateProcedure<typeof officeLocationsUpdateSchema>) => {
  const db = ctx.db;

  await db
    .from('office_locations')
    .update({ ...input })
    .eq('id', input.id as number)
    .eq('recruiter_id', ctx.recruiter_id)
    .throwOnError();
};

export const updateLocation = privateProcedure
  .input(officeLocationsUpdateSchema)
  .mutation(mutation);

export type UpdateLocation = ProcedureDefinition<typeof updateLocation>;
