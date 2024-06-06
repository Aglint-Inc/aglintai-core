import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { CompanyEmailsTypeDB } from '@/src/types/companyEmailTypes';

import { supabaseAdmin } from '../supabase/supabaseAdmin';

export const fetchScheduleDetails = async (schedule_id: string) => {
  const [schedule_details] = supabaseWrap(
    await supabaseAdmin
      .from('interview_schedule')
      .select('recruiter(email_template,name)')
      .eq('id', schedule_id),
  );
  if (!schedule_id) {
    throw new Error('Schedule doesnot exist');
  }

  return {
    template: schedule_details.recruiter.email_template as CompanyEmailsTypeDB,
    company_name: schedule_details.recruiter.name,
  };
};
