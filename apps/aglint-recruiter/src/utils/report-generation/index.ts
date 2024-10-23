import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '../supabase/supabaseAdmin';
import { generateReportForJob } from './utils/generateReportForJob';

const supabaseAdmin = getSupabaseServer();
export const reportGenerate = async () => {
  const company = await getTestCompanyDetails();
  const { allJobs } = await getAllJobs(company.id);
  await generateReportForJob(allJobs[0].id);
};

const getTestCompanyDetails = async () => {
  const company = supabaseWrap(
    await supabaseAdmin
      .from('recruiter')
      .select('*,primary_admin!inner(*)')
      .eq('primary_admin.email', 'dileep@aglinthq.com')
      .single(),
  );
  return company;
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
