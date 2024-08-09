import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';

export default async function rejection(application_id: string) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo,name)),public_jobs(job_title)',
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
      recruiter: { logo, name: comapanyName },
    },
    public_jobs: { job_title },
  } = candidateJob;

  const body = {
    recipient_email: email,
    mail_type: 'rejection',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[firstName]': first_name,
      '[jobTitle]': job_title,
      '[companyName]': comapanyName,
    },
  };

  return body;
}

// {
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637"
// }
