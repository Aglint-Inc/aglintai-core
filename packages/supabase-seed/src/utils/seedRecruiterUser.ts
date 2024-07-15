import {DatabaseTable} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import {getJsonRecords} from 'src/data';
import {supabaseAdmin} from 'src/supabase/SupabaseAdmin';

export const seedRecruiterUser = async () => {
  const recruiter_user_seed_data = (await getJsonRecords(
    'recruiter_user'
  )) as DatabaseTable['recruiter_user'][];

  supabaseWrap(
    await supabaseAdmin.from('recruiter_user').delete().neq('email', null)
  );

  const promises = recruiter_user_seed_data.map(async rec => {
    return supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .insert({
          ...rec,
        })
        .select()
    );
  });
  const seeded_users = await Promise.all(promises);

  console.log('created users', seeded_users.length);
  return seeded_users;
};
