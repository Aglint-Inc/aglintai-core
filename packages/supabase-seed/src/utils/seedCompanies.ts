import {DatabaseTable} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import {supabaseAdmin} from 'src/supabase/SupabaseAdmin';

export const seedCompanies = async (
  recruiter_seed_data: DatabaseTable['recruiter'][]
) => {
  supabaseWrap(
    await supabaseAdmin.from('recruiter').delete().not('id', 'is', null)
  );

  const promises = recruiter_seed_data.map(async rec => {
    console.log(rec.id);
    return supabaseWrap(
      await supabaseAdmin
        .from('recruiter')
        .insert({
          email: rec.email,
          recruiter_type: rec.recruiter_type,
          recruiter_active: rec.recruiter_active,
          id: rec.id,
        })
        .select()
    );
  });
  const seeded_companies = await Promise.all(promises);
  console.log('seeded companies', seeded_companies.length);
  return seeded_companies;
};
