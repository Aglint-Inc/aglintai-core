import { type DatabaseTable } from '@aglint/shared-types';

import { cloneCompWorkflowsForJob } from '@/utils/clone/clonecompWorkflows';
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
    await cloneCompWorkflowsForJob({
      company_id,
      job_id,
      supabase: getSupabaseServer(),
    });
  } catch (e) {
    console.error('Error cloning workflows', e);
  }
};
