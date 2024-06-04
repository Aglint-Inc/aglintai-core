import { supabaseAdmin } from '../../../supabase/supabaseAdmin';

export default async function Interview(application_id: string) {
  const {
    data: [candidateJob],
  } = await supabaseAdmin
    .from('applications')
    .select(
      'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
    )
    .eq('id', application_id);

  const {
    candidates: { email, recruiter_id, first_name },
    public_jobs: { company, job_title },
  } = candidateJob;

  const body = {
    recipient_email: email,
    mail_type: 'interview',
    recruiter_id,
    companyLogo: '',
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
