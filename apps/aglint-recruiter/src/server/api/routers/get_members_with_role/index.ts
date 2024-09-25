import { createPublicClient } from '@/server/db';

import { privateProcedure } from '../../trpc';

export const get_members_with_role = privateProcedure.query(
  async ({ ctx: { recruiter_id } }) => {
    const supabase = createPublicClient();
    return await getMembers(supabase, recruiter_id);
  },
);

export async function getMembers(
  supabase: ReturnType<typeof createPublicClient>,
  id: string,
) {
  const data = (
    await supabase
      .from('recruiter_relation')
      .select(
        'id, role_id, manager_id, created_by,recruiter_user!public_recruiter_relation_user_id_fkey(*, office_location:office_locations(*), department:departments(id,name)), roles(name)',
      )
      .eq('recruiter_id', id)
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
}
