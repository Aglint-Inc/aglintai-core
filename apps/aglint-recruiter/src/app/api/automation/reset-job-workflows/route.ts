import { z } from 'zod';

import { createPostRoute } from '@/apiUtils/createPostRoute';
import { cloneCompWorkflowsForJob } from '@/utils/clone/clonecompWorkflows';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const schema = z.object({
  company_id: z.string(),
});
const resetJobWorkflows = async ({ company_id }: z.infer<typeof schema>) => {
  const supabase = getSupabaseServer();
  const allJobIds = (
    await supabase
      .from('public_jobs')
      .select('id')
      .eq('recruiter_id', company_id)
      .throwOnError()
  ).data;
  await cloneCompWorkflowsForJob({
    company_id,
    job_id: allJobIds[0].id,
    supabase,
  });
  return 'ok';
};

export const POST = createPostRoute(schema, resetJobWorkflows);
