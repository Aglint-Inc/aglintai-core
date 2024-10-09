import { customRecruiterUserUpdateSchema } from '@aglint/shared-types/src/db/tables/recruiter_user.types';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const mutation = async ({
  input,
  ctx,
}: PrivateProcedure<typeof customRecruiterUserUpdateSchema>) => {
  const db = createPrivateClient();
  await db
    .from('recruiter_user')
    .update({ ...input })
    .eq('user_id', ctx.user_id)
    .throwOnError();

  return true;
};

export const updateCurrentUser = privateProcedure
  .input(customRecruiterUserUpdateSchema)
  .mutation(mutation);
