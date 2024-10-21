import { v4 } from 'uuid';

import { preSeedCompanyDetails } from './pre-seed';
import { SupabaseType } from '@aglint/shared-types';

export type ApiBodyParamsSignup = {
  email: string;
  user_id: string;
  first_name: string;
  last_name: string;
};

export const signupCompanyAdmin = async (
  parsed_body: ApiBodyParamsSignup,
  supabase: SupabaseType
) => {
  const { email, user_id, first_name, last_name } = parsed_body;
  const recUser = (
    await supabase
      .from('recruiter_user')
      .insert({
        user_id: user_id,
        email: email,
        first_name: first_name,
        last_name: last_name || '',
        status: 'active',
      })
      .select()
      .single()
  ).data!;

  const rec_id = v4();
  const rec = (
    await supabase
      .from('recruiter')
      .insert({
        id: rec_id,
        primary_admin: user_id,
        name: 'Temp',
      })
      .select()
      .single()
      .throwOnError()
  ).data!;

  await preSeedCompanyDetails(rec.id, supabase);

  const rol = (
    await supabase
      .from('roles')
      .select()
      .eq('name', 'admin')
      .eq('recruiter_id', rec.id)
      .single()
      .throwOnError()
  ).data!;

  await supabase.from('recruiter_relation').insert({
    recruiter_id: rec_id,
    user_id: user_id,
    is_active: true,
    created_by: user_id,
    role_id: rol.id,
  });

  await supabase
    .from('recruiter_user')
    .update({
      recruiter_id: rec.id,
      scheduling_settings: rec.scheduling_settings,
    })
    .eq('user_id', user_id);

  return {
    recruiter_user: recUser,
    recruiter: rec,
  };
};
