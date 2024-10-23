import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '../supabase/supabaseAdmin';

const supabaseAdmin = getSupabaseServer();
export const reportGenerate = async () => {};

const getAllJobs = async (recruiter_id: string) => {
  const allJobs = supabaseWrap(
    await supabaseAdmin
      .from('public_jobs')
      .select('*')
      .eq('recruiter_id', recruiter_id),
  );
  const allApplications = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*,applications(*)')
      .eq('applications.job_id', 'd'),
  );
  return { allJobs, allApplications };
};
