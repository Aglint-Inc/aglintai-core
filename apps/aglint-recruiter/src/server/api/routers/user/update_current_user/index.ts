import { customRecruiterUserUpdateSchema } from '@aglint/shared-types/src/db/tables/recruiter_user.types';

import { privateProcedure, type PrivateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const mutation = async ({
  input,
  ctx,
}: PrivateProcedure<typeof customRecruiterUserUpdateSchema>) => {
  const db = createPrivateClient();
  await db
    .from('recruiter_user')
    //@ts-ignore  remove ignore when strict mode is enabled in tsconfig
    .update({ ...input })
    .eq('id', ctx.user_id)
    .throwOnError();

  return true;
};

export const updateCurrentUser = privateProcedure
  .input(customRecruiterUserUpdateSchema)
  .mutation(mutation);
