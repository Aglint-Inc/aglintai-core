import { CustomRecruiterUpdateSchema } from '@aglint/shared-types/src/db/tables/recruiter.types';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const mutation = async ({
  input,
  ctx: { recruiter_id },
}: PrivateProcedure<typeof CustomRecruiterUpdateSchema>) => {
  const db = createPrivateClient();

  await db
    .from('recruiter')
    .update({ ...input })
    .eq('id', recruiter_id);
};

export const updateTenant = privateProcedure
  .input(CustomRecruiterUpdateSchema)
  .mutation(mutation);
