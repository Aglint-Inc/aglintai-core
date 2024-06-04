import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import type { PhoneScreeningType } from '../../types/supabase-fetch';

export default async function phoneScreening(application_id: string) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(id,job_title,company)',
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
    public_jobs: { id: job_id, company, job_title },
  } = candidateJob;

  const body: PhoneScreeningType = {
    recipient_email: email,
    mail_type: 'phone_screening',
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
