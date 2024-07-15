import {DatabaseTable} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import {getJsonRecords} from 'src/data';
import {supabaseAdmin} from 'src/supabase/SupabaseAdmin';

export const seedRolePermissions = async () => {
  const recruiter_user_seed_data = (await getJsonRecords(
    'role_permissions'
  )) as DatabaseTable['role_permissions'][];

  supabaseWrap(
    await supabaseAdmin.from('role_permissions').delete().not('id', 'is', null)
  );

  const promises = recruiter_user_seed_data.map(async rec => {
    return supabaseWrap(
      await supabaseAdmin
        .from('role_permissions')
        .insert({
          ...rec,
        })
        .select()
    );
  });
  const roles_per = await Promise.all(promises);

  console.log('created roles and permissions', roles_per.length);
  return roles_per;
};
