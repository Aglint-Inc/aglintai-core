import { DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { getSupabaseServer } from '../supabaseAdmin';

export const updateCompanyPref = async (
  company_id: string,
  pref: Pick<
    DatabaseTable['recruiter_preferences'],
    | 'scheduling'
    | 'slack'
    | 'workflow'
    | 'onboard_complete'
    | 'request'
    | 'reports'
    | 'integrations'
    | 'scoring'
    | 'roles'
  >
) => {
  const supabaseAdmin = getSupabaseServer();
  supabaseWrap(
    await supabaseAdmin
      .from('recruiter_preferences')
      .update(pref)
      .eq('recruiter_id', company_id)
  );
};
