import { type DatabaseTable } from '@aglint/shared-types';

import { createClient } from '../supabase/server';
import { verifyToken } from '../supabase/verifyToken';

export const server_check_permissions = async ({
  permissions,
}: {
  permissions: DatabaseTable['permissions']['name'][];
}) => {
  try {
    if (!permissions?.length) throw new Error('Permission not provided.');
    const supabase = await createClient();
    const jsonDetail = await verifyToken(supabase);
    const user_id = jsonDetail?.user?.id;

    if (!user_id) throw new Error('User unauthenticated');

    const { data: rel } = await supabase
      .from('recruiter_relation')
      .select(
        'recruiter_id, roles!inner(name, role_permissions!inner(permissions!inner(name, is_enable)))',
      )
      .eq('user_id', user_id)
      .single()
      .throwOnError();
    if (!rel) throw new Error('User not found');

    const rec_id = rel.recruiter_id;
    const role = rel.roles.name;
    const userPermissions = rel?.roles.role_permissions.map(
      (role) => role.permissions.name,
    );

    let is_allowed = permissions.includes('authorized');

    if (!is_allowed) {
      for (const permission of permissions) {
        if (userPermissions.includes(permission)) {
          is_allowed = true;
          break;
        }
      }
    }

    return {
      isAllowed: is_allowed,
      id: user_id,
      rec_id,
      role,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return { isAllowed: false, id: null, rec_id: null, role: null };
  }
};
