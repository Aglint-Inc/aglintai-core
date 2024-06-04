import { supabaseAdmin } from '../../../supabase/supabaseAdmin';

export default async function PhoneScreeningResend(application_id: string) {
  const {
    data: [candidateJob],
  } = await supabaseAdmin
    .from('applications')
    .select(
      'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(id,job_title,company)',
    )
    .eq('id', application_id);

  const {
    candidates: {
      email,
      recruiter_id,
      first_name,
      recruiter: { logo },
    },
    public_jobs: { id: job_id, company, job_title },
  } = candidateJob;

  const body = {
    recipient_email: email,
    mail_type: 'phone_screening_resend',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[firstName]': first_name,
      '[jobTitle]': job_title,
      '[companyName]': company,
      '[phoneScreeningLink]': `${process.env.BASE_URL}/candidate-phone-screening?job_post_id=${job_id}&application_id=${application_id}`,
    },
  };

  return body;
}

// http://localhost:3100/api/phone-screening-resend

// {
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637"
// }
