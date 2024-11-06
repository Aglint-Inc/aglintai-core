import { CustomRecruiterUpdateSchema } from '@aglint/shared-types/src/db/tables/recruiter.types';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const mutation = async ({
  input,
  ctx,
}: PrivateProcedure<typeof CustomRecruiterUpdateSchema>) => {
  const db = ctx.db;

  await db
    .from('recruiter')
    .update({ ...input })
    .eq('id', ctx.recruiter_id);
};

export const updateTenant = privateProcedure
  .input(CustomRecruiterUpdateSchema)
  .mutation(mutation);

export type UpdateTenant = ProcedureDefinition<typeof updateTenant>;
