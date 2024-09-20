import type { SupabaseType } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

export default async function requestCandidateSlot(
  supabaseAdmin: SupabaseType,
  application_id: string,
  request_id: string,
) {
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
      recruiter: { logo, name: companyName },
    },
    public_jobs: { job_title },
  } = candidateJob;

  const body = {
    recipient_email: email,
    mail_type: 'request_candidate_slot',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[firstName]': first_name,
      '[jobTitle]': job_title,
      '[companyName]': companyName,
      '[availabilityLink]': `${process.env.BASE_URL}/scheduling/request-availability/${request_id}`,
    },
  };

  return body;
}
