import { supabaseWrap } from '@aglint/shared-utils';
import { getSupabaseServer } from '../supabaseAdmin';

export const fetchCompanyRoles = async (recruiter_id: string) => {
  const supabaseAdmin = getSupabaseServer();
  const roles = supabaseWrap(
    await supabaseAdmin
      .from('roles')
      .select('*')
      .eq('recruiter_id', recruiter_id)
  );
  return {
    company_roles: roles,
  };
};
