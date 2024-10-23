import { supabaseWrap } from '@aglint/shared-utils';
import { getSupabaseServer } from '../supabaseAdmin';

export const updateCompanyPref = async (company_id: string) => {
  const supabaseAdmin = getSupabaseServer();
  supabaseWrap(
    await supabaseAdmin
      .from('recruiter_preferences')
      .update({
        scheduling: true,
        slack: true,
        workflow: true,
        onboard_complete: true,
        request: true,
        reports: true,
        integrations: true,
        scoring: true,
        roles: true,
        agent: true,
        analytics: true,
        banner_image: null,
        candidate_portal: true,
      })
      .eq('recruiter_id', company_id)
  );
};
