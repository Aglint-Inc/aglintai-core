import { createPrivateClient } from '@/server/db';

import { type PrivateProcedure, privateProcedure } from '../../trpc';

const query = async ({ ctx: { recruiter_id } }: PrivateProcedure) => {
  const db = createPrivateClient();
  return (
    await db
      .from('roles')
      .select('id, name')
      .eq('recruiter_id', recruiter_id)
      .throwOnError()
  ).data;
};

export const roles = privateProcedure.query(query);
