import { ScheduleUtils } from '@aglint/shared-utils';
import { supabaseAdmin } from '../../../supabase/supabaseAdmin';
import type { InitEmailAgentRemainderType } from '../../types/supabase-fetch';

interface FilterJson {
  start_date: string;
  end_date: string;
  user_tz: string;
}
export default async function initEmailAgentRemainder(
  filter_id: string,
  schedule_id: string,
) {
  const { data: filterJson } = await supabaseAdmin
    .from('interview_filter_json')
    .select(
      'filter_json,interview_schedule(applications(public_jobs(job_title,recruiter_id,company),candidates(first_name,email,recruiter(logo))))',
    )
    .eq('id', filter_id)
    .single()
    .throwOnError();
  const { end_date, start_date, user_tz } =
    filterJson.filter_json as unknown as FilterJson;
  const {
    interview_schedule: {
      applications: {
        candidates: {
          email,
          first_name,
          recruiter: { logo },
        },
        public_jobs: { company, recruiter_id, job_title },
      },
    },
  } = filterJson;

  const body: InitEmailAgentRemainderType = {
    recipient_email: email,
    mail_type: 'self_schedule_request_reminder',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[candidateFirstName]': first_name,
      '[Company Name]': company,
      '[Job Title]': job_title,
      '[startDate]': ScheduleUtils.convertDateFormatToDayjs(
        start_date,
        user_tz,
      ).format('MMM DD, YYYY'),
      '[endDate]': ScheduleUtils.convertDateFormatToDayjs(
        end_date,
        user_tz,
      ).format('MMM DD, YYYY'),
      '[companyTimeZone]': '',
      '[selfScheduleLink]': `${process.env.BASE_URL}/scheduling/invite/${schedule_id}?filter_id=${filter_id}`,
    },
  };

  return body;
}

// http://localhost:3100/api/init-email-agent

// {
//   "filter_id":"71b8859d-b6c6-425e-8b1a-e97ae8bb9498",
//   "meeting_id":"6c42550f-5d59-4179-aa3a-0c0ae060db88"
// }
