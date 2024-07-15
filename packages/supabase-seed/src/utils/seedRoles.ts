import {DatabaseTable} from '@aglint/shared-types';
import {defaultRoles, supabaseWrap} from '@aglint/shared-utils';
import {supabaseAdmin} from 'src/supabase/SupabaseAdmin';

export const seedCompaniesRoles = async (
  companies: Pick<DatabaseTable['recruiter'], 'id'>[]
) => {
  supabaseAdmin.auth.signOut();
  supabaseWrap(
    await supabaseAdmin.from('roles').delete().not('id', 'is', null)
  );

  let all_promises: Promise<any>[] = [];

  companies.forEach(async comp => {
    const promises = defaultRoles.map(async d => {
      supabaseWrap(
        await supabaseAdmin.from('roles').insert({
          name: d.name,
          description: d.description,
          recruiter_id: comp.id,
        })
      );
    });
    all_promises = [...all_promises, ...promises];
  });

  const roles = await Promise.all(all_promises);
  console.log('created roles', roles.length);
};
