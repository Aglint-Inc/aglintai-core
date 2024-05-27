import { DatabaseEnums, DB } from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';

export const server_check_permissions = async ({
  getVal,
  permission,
}: {
  // eslint-disable-next-line no-unused-vars
  getVal: (name: string) => string;
  permission: DatabaseEnums['permissions_type'];
}) => {
  try {
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
            'recruiter_id, roles( name, role_permissions( permissions( name )))',
          )
          .eq('user_id', user.id)
          .eq('is_active', true)
          .eq('roles.role_permissions.permissions.name', permission)
          .single()
          .then(({ data, error }) => {
            if (error) throw new Error(error.message);

            const role = data?.roles?.name;
            let is_allowed = false;
            if (data.roles?.role_permissions) {
              for (let item of data.roles.role_permissions) {
                if (item.permissions?.name == permission) {
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
              //     {} as { [key in DatabaseEnums['permissions_type']]: boolean },
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
    console.error(error);
    return { isAllowed: false, id: null, rec_id: null, role: null };
  }
};
