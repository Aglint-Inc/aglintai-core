import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '../supabase/supabaseAdmin';
import { generateReportForJob } from './utils/generateReportForJob';

const supabaseAdmin = getSupabaseServer();
export const reportGenerate = async () => {
  const allJobs = await getAllJobs('recruiter_id');
  generateReportForJob(allJobs[0].id);

  //
};

const getAllJobs = async (recruiter_id: string) => {
  const allJobs = supabaseWrap(
    await supabaseAdmin
      .from('public_jobs')
      .select('*')
      .eq('recruiter_id', recruiter_id),
  );
  return allJobs;
};
