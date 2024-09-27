import { createPublicClient } from '@/server/db';

import { type PrivateProcedure, privateProcedure } from '../../trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const db = createPublicClient();
  const data = (
    await db
      .from('recruiter_relation')
      .select(
        'id, role_id, manager_id, created_by,recruiter_user!public_recruiter_relation_user_id_fkey(*, office_location:office_locations(*), department:departments(id,name)), roles(name)',
      )
      .eq('recruiter_id', ctx.recruiter_id)
      .throwOnError()
  ).data!;
  return data.map((item) => {
    const users = item.recruiter_user!;
    return {
      ...users,
      created_by: item.created_by,
      role: item.roles?.name,
      role_id: item.role_id,
      manager_id: item.manager_id,
      recruiter_relation_id: item.id,
    };
  });
};

export const members = privateProcedure.query(query);
