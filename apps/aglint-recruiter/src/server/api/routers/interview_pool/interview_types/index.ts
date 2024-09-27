import { dayjsLocal } from '@aglint/shared-utils';
import isBetween from 'dayjs/plugin/isBetween';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

dayjsLocal.extend(isBetween);

const query = async ({ ctx: { recruiter_id } }: PrivateProcedure) => {
  const db = createPrivateClient();
  const interview_types = (
    await db
      .from('interview_types_view')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data;

  return interview_types;
};

export const interviewPools = privateProcedure.query(query);
