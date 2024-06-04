import { supabaseAdmin } from '../../../supabase/supabaseAdmin';

// application_id: string;
//     request_id: string;

export default async function RequestCandidateSlot(
  application_id: string,
  request_id: string,
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

// http://localhost:3100/api/request-candidate-slot

// {
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637",
//   "request_id":"296b1fc6-a0a9-4185-8853-7fb6984992b2"
// }
