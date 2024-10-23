import { CustomRecruiterPreferencesUpdateSchema } from '@aglint/shared-types/src/db/tables/recruiter_preferences.types';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const mutation = async ({
  input,
  ctx: { recruiter_id },
}: PrivateProcedure<typeof CustomRecruiterPreferencesUpdateSchema>) => {
  const db = await createPrivateClient();

  await db
    .from('recruiter_preferences')
    .update({ ...input })
    .eq('recruiter_id', recruiter_id);
};

export const updateTenantPreference = privateProcedure
  .input(CustomRecruiterPreferencesUpdateSchema)
  .mutation(mutation);

export type UpdateTenantPreference = ProcedureDefinition<
  typeof updateTenantPreference
>;
