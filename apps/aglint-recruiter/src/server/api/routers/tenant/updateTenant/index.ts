/* eslint-disable no-console */
import { CustomRecruiterSchema } from '@aglint/shared-types/src/db/tables/recruiter.types';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const mutation = async ({
  input,
  ctx: { recruiter_id },
}: PrivateProcedure<typeof CustomRecruiterSchema>) => {
  const db = createPrivateClient();

  await db
    .from('recruiter')
    //@ts-ignore  remove ignore when strict mode is enabled in tsconfig
    .update({ ...input })
    .eq('id', recruiter_id);
};

export const updateTenant = privateProcedure
  .input(CustomRecruiterSchema)
  .mutation(mutation);
