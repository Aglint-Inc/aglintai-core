import {supabaseWrap} from '@aglint/shared-utils';
import {company_seed} from 'src/data/seed_data';
import {supabaseAdmin} from 'src/supabase/SupabaseAdmin';

export const seedAuthUsers = async () => {
  const promises = company_seed.map(async rec => {
    supabaseWrap(
      await supabaseAdmin.rpc('reset_auth_users_identities', {
        user_email: rec.email,
      })
    );

    const user = supabaseWrap(
      await supabaseAdmin.auth.signUp({
        email: rec.email,
        password: 'Welcome@123',
      })
    );

    return user.user;
  });
  return await Promise.all(promises);
};
