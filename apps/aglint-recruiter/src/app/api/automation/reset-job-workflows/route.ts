import { supabaseWrap } from '@aglint/shared-utils';
import { z } from 'zod';

import { createPostRoute } from '@/apiUtils/createPostRoute';
import { cloneCompWorkflowsForJob } from '@/utils/clone/cloneCompWorkflowsForJob';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const schema = z.object({
  company_id: z.string(),
});
const resetJobWorkflows = async ({ company_id }: z.infer<typeof schema>) => {
  const supabase = getSupabaseServer();
  const allJobIds = supabaseWrap(
    await supabase
      .from('public_jobs')
      .select('id')
      .eq('recruiter_id', company_id)
      .throwOnError(),
  );
  const allJobs = allJobIds.map(async (job) => {
    supabase.from('workflow_job_relation').delete().eq('job_id', job.id);
    await cloneCompWorkflowsForJob({
      company_id,
      job_id: job.id,
      supabase,
    });
  });
  await Promise.all(allJobs);
  return 'ok';
};

export const POST = createPostRoute(schema, resetJobWorkflows);
