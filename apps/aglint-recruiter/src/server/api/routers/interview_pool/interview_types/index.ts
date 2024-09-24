import { dayjsLocal } from '@aglint/shared-utils';
import isBetween from 'dayjs/plugin/isBetween';
import { z } from 'zod';

import {
  //   type PrivateProcedure,
  //   privateProcedure,
  type PublicProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

dayjsLocal.extend(isBetween);

export const interviewPoolModuleSchema = z.object({
  recruiter_id: z.string().uuid(),
});

const query = async ({
  input: { recruiter_id },
}: PublicProcedure<typeof interviewPoolModuleSchema>) => {
  const adminDb = createPublicClient();
  const interview_types = (
    await adminDb
      .from('interview_types_view')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data;

  return interview_types;
};

export const interviewPools = publicProcedure
  .input(interviewPoolModuleSchema)
  .query(query);
