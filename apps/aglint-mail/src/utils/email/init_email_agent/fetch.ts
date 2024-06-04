import dayjs from 'dayjs';
import { supabaseAdmin } from '../../../supabase/supabaseAdmin';

export default async function InitEmailAgent(
  application_id: string,
  meeting_id: string,
  candidateRequestAvailability_id: string,
) {
  const {
    data: [candidateJob],
  } = await supabaseAdmin
    .from('applications')
    .select(
      'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
    )
    .eq('id', application_id);
  const {
    data: [date],
  } = await supabaseAdmin
    .from('candidate_request_availability')
    .select('date_range')
    .eq('id', candidateRequestAvailability_id);

  const [startDate, endDate]: any = date.date_range;
  const {
    candidates: {
      email,
      recruiter_id,
      first_name,
      recruiter: { logo },
    },
    public_jobs: { company, job_title },
  } = candidateJob;

  const body = {
    recipient_email: email,
    mail_type: 'init_email_agent',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[candidateFirstName]': first_name,
      '[companyName]': company,
      '[jobRole]': job_title,
      '[startDate]': dayjs(startDate).format('DD MMMM YYYY'),
      '[endDate]': dayjs(endDate).format('DD MMMM YYYY'),
      '[companyTimeZone]': '',
      '[selfScheduleLink]': `https://dev.aglinthq.com/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`,
    },
  };

  return body;
}

// http://localhost:3100/api/init-email-agent
// {
//     "meeting_id": "6c42550f-5d59-4179-aa3a-0c0ae060db88",
//     "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637",
//     "schedule_id": "74559de0-2bc8-4028-a748-a7eae2f68182",
//     "candidateRequestAvailability_id":"85dcaa87-248b-4488-b445-276036fd6541"
// }
