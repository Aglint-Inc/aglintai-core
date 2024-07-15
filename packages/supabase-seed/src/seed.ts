import {supabaseWrap} from '@aglint/shared-utils';
import {supabaseAdmin} from './supabase/SupabaseAdmin';

const main = async () => {
  const user = supabaseWrap(
    await supabaseAdmin.auth.signUp({
      email: 'chinmai@aglinthq.com',
      password: 'Welcome@123',
    })
  );
  console.log(user);
};

main();
