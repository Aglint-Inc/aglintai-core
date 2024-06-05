import dayjs from 'dayjs';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  durationCalculator,
  platformRemoveUnderscore,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../common/functions';
import type { CandidateCancelRequestType } from '../../types/supabase-fetch';
import type { MeetingDetails } from '../../types/apiTypes';

export default async function candidateCancelRequest(
  session_ids: string[],
  application_id: string,
  meeting_id: string,
  interview_cancel_id: string,
) {
  const sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        'session_type,session_duration,schedule_type,name,interview_meeting(start_time,end_time)',
      )
      .in('id', session_ids),
  );
  if (!sessions) {
    throw new Error('sessions not available');
  }
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(name,logo)),public_jobs(job_title,company)',
      )
      .eq('id', application_id),
  );
  if (!candidateJob) {
    throw new Error('candidate details and jobs details not available');
  }

  const [session_cancel] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_cancel')
      .select('reason')
      .eq('id', interview_cancel_id),
  );

  if (!candidateJob) {
    throw new Error('cancel session details not available');
  }

  const {
    candidates: {
      email,
      recruiter_id,
      first_name,
      recruiter: { name: recruiterName, logo },
    },
    public_jobs: { company },
  } = candidateJob;

  const Sessions: MeetingDetails[] = sessions.map((session) => {
    const {
      interview_meeting: { start_time, end_time },
      name,
      schedule_type,
      session_duration,
      session_type,
    } = session;
    return {
      date: dayjs(start_time).format('ddd MMMM DD, YYYY'),
      time: `${dayjs(start_time).format('hh:mm A')} - ${dayjs(end_time).format('hh:mm A')}`,
      sessionType: name,
      platform: platformRemoveUnderscore(schedule_type),
      duration: durationCalculator(session_duration),
      sessionTypeIcon: sessionTypeIcon(session_type),
      meetingIcon: scheduleTypeIcon(schedule_type),
    };
  });

  const body: CandidateCancelRequestType = {
    recipient_email: email,
    mail_type: 'candidate_cancel_request',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[firstName]': first_name,
      '[rescheduleReason]': session_cancel.reason,
      '[recruiterName]': recruiterName,
      '[companyName]': company,
      'meetingLink': `https://dev.aglinthq.com/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`,
      'meetingDetails': [...Sessions],
    },
  };
  return body;
}
