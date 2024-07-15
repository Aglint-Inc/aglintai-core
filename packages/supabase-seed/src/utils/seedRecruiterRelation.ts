import {DatabaseTable} from '@aglint/shared-types';
import {supabaseWrap} from '@aglint/shared-utils';
import {getJsonRecords} from 'src/data';
import {supabaseAdmin} from 'src/supabase/SupabaseAdmin';

export const seedRecruiterRelation = async () => {
  const recruiter_relation = (await getJsonRecords(
    'recruiter_relation'
  )) as DatabaseTable['recruiter_relation'][];

  supabaseWrap(
    await supabaseAdmin
      .from('recruiter_relation')
      .delete()
      .not('id', 'is', null)
  );

  const promises = recruiter_relation.map(async rec => {
    return supabaseWrap(
      await supabaseAdmin.from('recruiter_relation').insert({
        ...rec,
      })
    );
  });

  const relations = await Promise.all(promises);
  console.log('created relations', relations.length);
  return relations;
};
