import { supabaseWrap } from '@aglint/shared-utils';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const fetchDBScheduleDetails = async (filter_id: string) => {
  const [filter_json_data] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*,interview_schedule(recruiter_id, id,recruiter(id,name),applications(id,candidate_id,candidates(email,first_name,last_name),public_jobs(job_title)))',
      )
      .eq('id', filter_id),
  );
  const email_templates = supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .select()
      .eq('recruiter_id', filter_json_data.interview_schedule.recruiter_id),
  );
  if (!filter_json_data) {
    throw new Error('invalid filter id');
  }

  return {
    filter_json_data,
    candidate: filter_json_data.interview_schedule.applications.candidates,
    application: filter_json_data.interview_schedule.applications,
    email_templates,
    company: filter_json_data.interview_schedule.recruiter,
    job: filter_json_data.interview_schedule.applications.public_jobs,
  };
};
