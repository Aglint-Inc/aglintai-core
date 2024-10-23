import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '../supabase/supabaseAdmin';
import { generateReportForJob } from './utils/generateReportForJob';

const supabaseAdmin = getSupabaseServer();
export const reportGenerate = async () => {
  const { allJobs } = await getAllJobs('acbfe870-64bc-4dcd-9671-0ae240daffb2');
  await generateReportForJob(allJobs[0].id);
};

const getAllJobs = async (recruiter_id: string) => {
  const allJobs = supabaseWrap(
    await supabaseAdmin
      .from('public_jobs')
      .select('*')
      .eq('recruiter_id', recruiter_id),
  );
  const integration_details = supabaseWrap(
    await supabaseAdmin
      .from('integrations')
      .select('*')
      .eq('recruiter_id', recruiter_id)
      .single(),
  );
  return { allJobs, integration_details };
};
