import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import type { ApplicationReceivedDataType } from '../../../utils/types/supabase-fetch';

export default async function applicationReceived(application_id: string) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', application_id),
  );

  if (!candidateJob) {
    throw new Error('no data in Application'); // Re-throw the Supabase error for further handling
  }
  const {
    candidates: {
      email,
      recruiter_id,
      first_name,
      recruiter: { logo },
    },
    public_jobs: { company, job_title },
  } = candidateJob;

  const body: ApplicationReceivedDataType = {
    recipient_email: email,
    mail_type: 'application_received',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[firstName]': first_name,
      '[jobTitle]': job_title,
      '[companyName]': company,
      '[supportLink]': '',
    },
  };

  return body;
}

// http://localhost:3100/api/application-received

// {
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637"
// }
