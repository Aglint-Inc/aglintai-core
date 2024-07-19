import { DatabaseEnums, DB } from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';
import { jwtDecode } from 'jwt-decode';

import { EventSessionType } from './type';

export const server_check_permissions = async ({
  getVal,
  permissions,
}: {
  // eslint-disable-next-line no-unused-vars
  getVal: (name: string) => string;
  permissions: DatabaseEnums['permissions_type'][];
}) => {
  try {
    if (!permissions?.length) throw new Error('Permission not provided.');
    const supabase = createServerClient<DB>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return getVal(name);
          },
        },
      },
    );

    return await supabase.auth.getUser().then(async ({ data, error }) => {
      if (error) throw new Error(error.message);
      const user = data?.user;
      if (user?.id) {
        const { data: sesData } = await supabase.auth.getSession();
        const decoded = jwtDecode(
          sesData.session.access_token,
        ) as EventSessionType;
        const userpermissions =
          decoded.app_metadata.role_permissions.permissions;
        const role = decoded.app_metadata.role_permissions.role;
        const rec_id = decoded.app_metadata.role_permissions.recruiter_id;
        let is_allowed = false;

        for (let permission of permissions) {
          if (userpermissions.includes(permission)) {
            is_allowed = true;
            break;
          }
        }

        return {
          isAllowed: is_allowed,
          id: user.id,
          rec_id,
          role,
        };
      }
      throw new Error('Failed to load auth user.');
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.error(error);
    return { isAllowed: false, id: null, rec_id: null, role: null };
  }
};
