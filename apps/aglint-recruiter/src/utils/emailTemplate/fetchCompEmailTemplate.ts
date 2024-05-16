import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { CompanyEmailsTypeDB } from '@/src/types/companyEmailTypes';

import { supabaseAdmin } from '../supabase/supabaseAdmin';

export const fetchScheduleDetails = async (schedule_id: string) => {
  const [schedule_details] = supabaseWrap(
    await supabaseAdmin
      .from('interview_schedule')
      .select(
        'recruiter(email_template,name),applications(public_jobs(job_title))',
      )
      .eq('id', schedule_id),
  );

  return {
    template: schedule_details.recruiter.email_template as CompanyEmailsTypeDB,
    company_name: schedule_details.recruiter.name,
    job_title: schedule_details.applications.public_jobs.job_title,
  };
};
