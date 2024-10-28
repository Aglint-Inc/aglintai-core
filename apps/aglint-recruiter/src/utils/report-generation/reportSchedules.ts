import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '../supabase/supabaseAdmin';
import { report_gen_Params, test_admin_email } from './constant';
import { generateReportSchedules } from './utils/generateReportSchedules';

const supabaseAdmin = getSupabaseServer();
export const reportSchedules = async () => {
  const company = await getTestCompanyDetails();
  const { allJobs } = await getAllJobs(company.id);
  for (const job of allJobs.slice(0, report_gen_Params.max_job)) {
    await generateReportSchedules(job.id);
  }
};

const getTestCompanyDetails = async () => {
  const company = supabaseWrap(
    await supabaseAdmin
      .from('recruiter')
      .select('*,primary_admin!inner(*)')
      .eq('primary_admin.email', test_admin_email)
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
