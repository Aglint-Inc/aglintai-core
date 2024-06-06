import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { CompanyEmailsTypeDB } from '@/src/types/companyEmailTypes';

import { supabaseAdmin } from '../supabase/supabaseAdmin';

export const fetchScheduleDetails = async (schedule_id: string) => {
  const [schedule_details] = supabaseWrap(
    await supabaseAdmin
      .from('interview_schedule')
      .select(
        'recruiter(email_template,name),applications(candidate_id,candidates(email,first_name,last_name),public_jobs(job_title))',
      )
      .eq('id', schedule_id),
  );
  if (!schedule_id) {
    throw new Error('Schedule doesnot exist');
  }

  return {
    template: schedule_details.recruiter.email_template as CompanyEmailsTypeDB,
    company_name: schedule_details.recruiter.name,
    job_title: schedule_details.applications.public_jobs.job_title,
    candidate: {
      candidate_id: schedule_details.applications.candidate_id,
      first_name: schedule_details.applications.candidates.first_name,
      last_name: schedule_details.applications.candidates.last_name,
      email: schedule_details.applications.candidates.email,
    },
  };
};
