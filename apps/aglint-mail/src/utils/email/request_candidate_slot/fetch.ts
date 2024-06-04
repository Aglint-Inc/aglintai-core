import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import type { RequestCandidateSlotType } from '../../types/supabase-fetch';

export default async function requestCandidateSlot(
  application_id: string,
  request_id: string,
) {
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

  const body: RequestCandidateSlotType = {
    recipient_email: email,
    mail_type: 'request_candidate_slot',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[firstName]': first_name,
      '[jobTitle]': job_title,
      '[companyName]': company,
      '[availabilityLink]': `${process.env.BASE_URL}/scheduling/request-availability/${request_id}`,
    },
  };

  return body;
}
