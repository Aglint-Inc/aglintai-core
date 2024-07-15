import {DatabaseTable} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import {supabaseAdmin} from 'src/supabase/SupabaseAdmin';

export const seedRecruiterUser = async (
  auth_user_map: Record<string, string>,
  recruiter_user_seed_data: DatabaseTable['recruiter_user'][]
) => {
  supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .delete()
      .not('user_id', 'is', null)
  );

  const promises = recruiter_user_seed_data.map(async rec => {
    await supabaseAdmin.auth.signOut();
    return supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .insert({
          ...rec,
          user_id: auth_user_map[rec.email],
        })
        .select()
    );
  });
  const seeded_users = await Promise.all(promises);

  console.log('created users', seeded_users.length);
  return seeded_users;
};
