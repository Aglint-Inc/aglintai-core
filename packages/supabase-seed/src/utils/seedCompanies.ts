import {DatabaseTable} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import {getJsonRecords} from 'src/data';
import {supabaseAdmin} from 'src/supabase/SupabaseAdmin';

export const seedCompanies = async () => {
  const recruiter_seed_data = (await getJsonRecords(
    'recruiter'
  )) as DatabaseTable['recruiter'][];

  supabaseWrap(
    await supabaseAdmin.from('recruiter').delete().not('id', 'is', null)
  );

  const promises = recruiter_seed_data.map(async rec => {
    const [recruiter] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter')
        .insert({
          ...rec,
        })
        .select()
    );

    return recruiter;
  });
  const seeded_companies = await Promise.all(promises);
  console.log('created companies', seeded_companies.length);
  return seeded_companies;
};
