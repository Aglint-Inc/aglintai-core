import { type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

import { cloneCompWorkflowsForJob } from '@/utils/clone/cloneCompWorkflowsForJob';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';
export const onInsertPublicJobs = async ({
  new_data,
}: {
  new_data: DatabaseTable['public_jobs'];
}) => {
  // Clone workflows
  cloneWorkflows(new_data.id, new_data.recruiter_id);
};

const cloneWorkflows = async (job_id: string, company_id: string) => {
  try {
    const supabaseAdmin = getSupabaseServer();
    const recruiter = supabaseWrap(
      await supabaseAdmin
        .from('recruiter')
        .select('*, recruiter_preferences!inner(*)')
        .eq('id', company_id)
        .single(),
    );
    if (!recruiter.recruiter_preferences.workflow) return;
    await cloneCompWorkflowsForJob({
      company_id,
      job_id,
      supabase: getSupabaseServer(),
    });
  } catch (e) {
    console.error('Error cloning workflows', e);
  }
};
