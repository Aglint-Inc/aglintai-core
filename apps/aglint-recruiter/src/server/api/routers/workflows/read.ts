import { createPrivateClient } from '@/server/db';

import { type PrivateProcedure, privateProcedure } from '../../trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = createPrivateClient();
  return (
    await db
      .from('workflow_view')
      .select()
      .order('created_at')
      .eq('recruiter_id', ctx.recruiter_id)
      .eq('workflow_type', 'company')
  ).data;
};

export const read = privateProcedure.query(query);
