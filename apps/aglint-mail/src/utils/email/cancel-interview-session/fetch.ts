import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import type { CancelInterviewSessionType } from '../../types/supabase-fetch';

export default async function cancelInterviewSession(
  session_id: string,
  application_id: string,
) {
  const [session] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        'session_type,session_duration,schedule_type,name,interview_meeting(start_time,end_time)',
      )
      .eq('id', session_id),
  );

  if (!session) {
    throw new Error('session details not avalible');
  }

  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', application_id),
  );
  if (!candidateJob) {
    throw new Error(
      'candidate details and job details are details not avalible',
    );
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

  const { name } = session;

  const body: CancelInterviewSessionType = {
    recipient_email: email,
    mail_type: 'cancel_interview_session',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[firstName]': first_name,
      '[sessionName]': name,
      '[companyName]': company,
      '[jobTitle]': job_title,
    },
  };

  return body;
}
