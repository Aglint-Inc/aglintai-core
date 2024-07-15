import {DatabaseTable} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import {getJsonRecords} from 'src/data';
import {supabaseAdmin} from 'src/supabase/SupabaseAdmin';

export const seedCompaniesRoles = async () => {
  supabaseWrap(
    await supabaseAdmin.from('roles').delete().not('id', 'is', null)
  );

  const roles_seed = (await getJsonRecords(
    'roles'
  )) as DatabaseTable['roles'][];

  const all_promises: Promise<any>[] = roles_seed.map(async rec => {
    supabaseWrap(
      await supabaseAdmin.from('roles').insert({
        ...rec,
      })
    );
  });
  const roles = await Promise.all(all_promises);
  console.log('created roles', roles.length);
};
