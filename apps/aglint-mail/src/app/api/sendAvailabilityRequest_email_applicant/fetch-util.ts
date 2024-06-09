import type { InterviewSessionTypeDB } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';
import type { MeetingDetails } from '../../../utils/types/apiTypes';
import type { CandidateAvailabilityRequestType } from '../../../utils/types/supabase-fetch';

export default async function candidateAvailabilityRequestReminder(
  sessions_data: InterviewSessionTypeDB[],
  application_id: string,
  availability_req_id: string,
) {
  const sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select('session_type,session_duration,schedule_type,name')
      .in(
        'id',
        sessions_data.map((s) => s.id),
      ),
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

  const candidate_link = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/request-availability/${availability_req_id}`;

  const body: CandidateAvailabilityRequestType = {
    recipient_email: email,
    mail_type: 'sendAvailabilityRequest_email_applicant',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[companyName]': company,
      '[firstName]': first_name,
      'pickYourSlot': candidate_link,
      'meetingDetails': [...Sessions],
    },
  };

  return body;
}
