/* eslint-disable no-console */
import { customInterviewModuleUpdateSchema } from '@aglint/shared-types/src/db/tables/interview_module';
import { type customRecruiterUpdateSchema } from '@aglint/shared-types/src/db/tables/recruiter.types';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const mutation = async ({
  input,
  ctx: { recruiter_id },
}: PrivateProcedure<typeof customRecruiterUpdateSchema>) => {
  const db = createPrivateClient();

  await db
    .from('interview_module')
    //@ts-ignore  remove ignore when strict mode is enabled in tsconfig
    .update({ ...input })
    .eq('id', recruiter_id);
};

export const updateInterviewPool = privateProcedure
  .input(customInterviewModuleUpdateSchema)
  .mutation(mutation);
