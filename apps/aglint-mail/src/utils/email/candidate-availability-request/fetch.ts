import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  durationCalculator,
  platformRemoveUnderscore,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../common/functions';
import type { CandidateAvailabilityRequestType } from '../../types/supabase-fetch';
import type { MeetingDetails } from '../../types/apiTypes';

export default async function candidateAvailabilityRequest(
  session_ids: string[],
  application_id: string,
  schedule_id: string,
  filter_id: string,
) {
  const sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select('session_type,session_duration,schedule_type,name')
      .in('id', session_ids),
  );

  if (!sessions) {
    throw new Error('sessions are not available');
  }
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(company)',
      )
      .eq('id', application_id),
  );
  if (!candidateJob) {
    throw new Error('candidate and job details are not available');
  }

  const Sessions: MeetingDetails[] = sessions.map((session) => {
    const { name, schedule_type, session_duration, session_type } = session;
    return {
      sessionType: name,
      platform: platformRemoveUnderscore(schedule_type),
      duration: durationCalculator(session_duration),
      sessionTypeIcon: sessionTypeIcon(session_type),
      meetingIcon: scheduleTypeIcon(schedule_type),
    };
  });

  const {
    candidates: {
      email,
      recruiter_id,
      first_name,
      recruiter: { logo },
    },
    public_jobs: { company },
  } = candidateJob;

  const body: CandidateAvailabilityRequestType = {
    recipient_email: email,
    mail_type: 'candidate_availability_request',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[companyName]': company,
      '[firstName]': first_name,
      'pickYourSlot': `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/invite/${schedule_id}?filter_id=${filter_id}`,
      'meetingDetails': [...Sessions],
    },
  };

  return body;
}
