import { DatabaseTable, DB } from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';

export const server_check_permissions = async ({
  getVal,
  permissions,
}: {
  // eslint-disable-next-line no-unused-vars
  getVal: (name: string) => string;
  permissions: DatabaseTable['permissions']['name'][];
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
          //   set(name: string, value: string, options: { [key: string]: any }) {
          //     res.setHeader('Set-Cookie', `${name}=${value}; ${options}`);
          //   },
          //   remove(name: string) {
          //     res.setHeader('Set-Cookie', `${name}=; Max-Age=0`);
          //   },
        },
      },
    );

    return await supabase.auth.getUser().then(({ data, error }) => {
      if (error) throw new Error(error.message);
      const user = data.user;
      if (user.id) {
        return supabase
          .from('recruiter_relation')
          .select(
            'recruiter_id, roles( name, role_permissions!inner(permissions!inner( name )))',
          )
          .eq('user_id', user.id)
          .eq('is_active', true)
          .in('roles.role_permissions.permissions.name', permissions)
          .eq('roles.role_permissions.permissions.is_enable', true)
          .single()
          .then(({ data, error }) => {
            if (error) throw new Error(error.message);
            const role = data?.roles?.name;
            let is_allowed = false;
            if (data?.roles?.role_permissions) {
              const tempPermissions = data.roles.role_permissions.map(
                (item) => item.permissions.name,
              );
              for (let permission of permissions) {
                if (tempPermissions.includes(permission)) {
                  is_allowed = true;
                  break;
                }
              }
              //     const permissions = data?.roles?.role_permissions.reduce(
              //     (prev, curr) => {
              //       if (curr.permissions?.name)
              //         prev[curr.permissions.name] = true;
              //       return prev;
              //     },
              //     // eslint-disable-next-line no-unused-vars
              //     {} as { [key in DatabaseTable['permissions']['name']]: boolean },
              //   );
            }
            return {
              isAllowed: is_allowed,
              id: user.id,
              rec_id: data?.recruiter_id,
              role,
            };
          });
      }
      throw new Error('Failed to load auth user.');
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.error(error);
    return { isAllowed: false, id: null, rec_id: null, role: null };
  }
};
