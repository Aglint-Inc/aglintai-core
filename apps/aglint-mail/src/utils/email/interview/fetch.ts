import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import type { InterviewType } from '../../types/supabase-fetch';

export default async function interview(application_id: string) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', application_id),
  );

  if (!candidateJob) {
    throw new Error('candidate and jobs details are not available');
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

  const body: InterviewType = {
    recipient_email: email,
    mail_type: 'interview',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[firstName]': first_name,
      '[jobTitle]': job_title,
      '[companyName]': company,
      '[supportLink]': '',
      '[interviewLink]': ``,
    },
  };

  return body;
}

// http://localhost:3100/api/interview

// {
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637"
// }
