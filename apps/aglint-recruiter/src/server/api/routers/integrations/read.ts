import { createPrivateClient } from '@/server/db';

import { type PrivateProcedure, privateProcedure } from '../../trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = createPrivateClient();
  return (
    await db
      .from('integrations')
      .select('*')
      .eq('recruiter_id', ctx.recruiter_id)
      .single()
      .throwOnError()
  ).data;
};

export const read = privateProcedure.query(query);
