import { ScheduleUtils } from '@aglint/shared-utils';
import { supabaseAdmin } from '../../../supabase/supabaseAdmin';

export default async function InitEmailAgent(
  filter_id: string,
  meeting_id: string,
) {
  const {
    data: [filterJson],
  }: any = await supabaseAdmin
    .from('interview_filter_json')
    .select(
      'filter_json,interview_schedule(applications(public_jobs(job_title,company),candidates(first_name,email,recruiter_id,recruiter(logo))))',
    )
    .eq('id', filter_id);

  const {
    filter_json: { start_date, end_date, user_tz },
    interview_schedule: {
      applications: {
        candidates: {
          email,
          recruiter_id,
          first_name,
          recruiter: { logo },
        },
        public_jobs: { company, job_title },
      },
    },
  } = filterJson;

  const body = {
    recipient_email: email,
    mail_type: 'init_email_agent',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[candidateFirstName]': first_name,
      '[companyName]': company,
      '[jobRole]': job_title,
      '[startDate]': ScheduleUtils.convertDateFormatToDayjs(
        start_date,
        user_tz,
      ).format('MMM DD, YYYY'),
      '[endDate]': ScheduleUtils.convertDateFormatToDayjs(
        end_date,
        user_tz,
      ).format('MMM DD, YYYY'),
      '[companyTimeZone]': '',
      '[selfScheduleLink]': `${process.env.BASE_URL}/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`,
    },
  };

  return body;
}

// http://localhost:3100/api/init-email-agent

// {
//   "filter_id":"71b8859d-b6c6-425e-8b1a-e97ae8bb9498",
//   "meeting_id":"6c42550f-5d59-4179-aa3a-0c0ae060db88"
// }
