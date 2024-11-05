import { CustomRecruiterPreferencesUpdateSchema } from '@aglint/shared-types/src/db/tables/recruiter_preferences.types';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const mutation = async ({
  input,
  ctx,
}: PrivateProcedure<typeof CustomRecruiterPreferencesUpdateSchema>) => {
  const db = ctx.db;

  await db
    .from('recruiter_preferences')
    .update({ ...input })
    .eq('recruiter_id', ctx.recruiter_id);
};

export const updateTenantPreference = privateProcedure
  .input(CustomRecruiterPreferencesUpdateSchema)
  .mutation(mutation);

export type UpdateTenantPreference = ProcedureDefinition<
  typeof updateTenantPreference
>;
