import {supabaseWrap} from '@aglint/shared-utils';
import {supabaseAdmin} from 'src/supabase/SupabaseAdmin';
import {getJsonRecords} from 'src/data';

export const seedAuthUsers = async () => {
  const all_auth_users = (await getJsonRecords('auth_users')) as any[];
  const promises = all_auth_users.map(async rec => {
    supabaseWrap(
      await supabaseAdmin.rpc('reset_auth_users_identities', {
        user_email: rec.email,
      })
    );

    supabaseWrap(
      await supabaseAdmin.rpc('create_auth_user', {
        app_meta_data: {},
        email: rec.email,
        password: 'Welcome@123',
        user_id: rec.id,
        user_meta_data: {},
      })
    );
  });

  const auth_users = await Promise.all(promises);
  console.log('created auth records', auth_users.length);
  return auth_users;
};
