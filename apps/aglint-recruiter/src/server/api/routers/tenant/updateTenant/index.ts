/* eslint-disable no-console */
import { recruiterUpdateSchema } from '@aglint/shared-types';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const mutation = async ({
  input,
  ctx: { recruiter_id },
}: PrivateProcedure<typeof recruiterUpdateSchema>) => {
  const db = createPrivateClient();

  await db
    .from('recruiter')
    .update({ ...input })
    .eq('id', recruiter_id);
};

export const updateTenant = privateProcedure
  .input(recruiterUpdateSchema)
  .mutation(mutation);
