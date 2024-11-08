import { officeLocationsInsertSchema } from '@aglint/shared-types';

const schemaWithoutId = officeLocationsInsertSchema.omit({
  id: true,
  recruiter_id: true,
});
import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const mutation = async ({
  input,
  ctx,
}: PrivateProcedure<typeof schemaWithoutId>) => {
  const db = ctx.db;

  await db
    .from('office_locations')
    .insert({ ...input, recruiter_id: ctx.recruiter_id });
};

export const insertLocation = privateProcedure
  .input(schemaWithoutId)
  .mutation(mutation);

export type InsertLocation = ProcedureDefinition<typeof insertLocation>;
