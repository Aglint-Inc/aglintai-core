import { supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
export const getWActions = async (job_id: string) => {
  const [job] = supabaseWrap(
    await supabaseAdmin.from('public_jobs').select().eq('id', job_id),
  );
  const job_level_workflows = supabaseWrap(
    await supabaseAdmin
      .from('workflow_job_relation')
      .select()
      .eq('job_id', job_id),
  );
  const company_actions = supabaseWrap(
    await supabaseAdmin
      .from('workflow_action')
      .select('*,workflow(*)')
      .eq('workflow.recruiter_id', job.recruiter_id),
  );
  //job level
  const job_level_actions = company_actions.filter(
    (w_a) =>
      w_a.workflow.workflow_type === 'job' &&
      job_level_workflows.find(
        (j_l_w) => j_l_w.workflow_id === w_a.workflow_id,
      ),
  );

  return {
    company_actions,
    job_level_actions,
  };
};
