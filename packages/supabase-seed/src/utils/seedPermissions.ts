import {DatabaseTable} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import {getJsonRecords} from 'src/data';
import {supabaseAdmin} from 'src/supabase/SupabaseAdmin';

export const seedPermissions = async () => {
  supabaseWrap(
    await supabaseAdmin.from('permissions').delete().not('id', 'is', null)
  );

  const permissions_seed = (await getJsonRecords(
    'permisssions'
  )) as DatabaseTable['permissions'][];

  const all_promises: Promise<any>[] = permissions_seed.map(async rec => {
    supabaseWrap(
      await supabaseAdmin.from('permissions').insert({
        ...rec,
      })
    );
  });

  const permissions = await Promise.all(all_promises);
  console.log('create permissions', permissions.length);
  return permissions;
};
