import dayjs from 'dayjs';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';
import type { MeetingDetails } from '../../../utils/types/apiTypes';
import type { CandidateCancelRequestType } from '../../../utils/types/supabase-fetch';

interface SessionCancel {
  note: string;
}
export default async function candidateCancelRequest(
  session_ids: string[],
  application_id: string,
  meeting_id: string,
  interview_cancel_id: string,
  recruiter_user_id: string,
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
        'candidates(first_name,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', application_id),
  );
  if (!candidateJob) {
    throw new Error('candidate details and jobs details not available');
  }

  const [session_cancel] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_cancel')
      .select('reason,other_details')
      .eq('id', interview_cancel_id),
  );

  if (!session_cancel) {
    throw new Error('cancel session details not available');
  }
  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('email,first_name')
      .eq('user_id', recruiter_user_id),
  );

  if (!recruiter_user) {
    throw new Error('cancel session details not available');
  }

  const { note } = session_cancel.other_details as unknown as SessionCancel;

  const {
    candidates: {
      recruiter_id,
      first_name,
      recruiter: { logo },
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
    recipient_email: recruiter_user.email,
    mail_type: 'candidate_cancel_request',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[firstName]': first_name,
      '[rescheduleReason]': session_cancel.reason,
      '[recruiterName]': recruiter_user.first_name,
      '[companyName]': company,
      '[additionalRescheduleNotes]': note,
      'meetingLink': `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`,
      'meetingDetails': [...Sessions],
    },
  };
  return body;
}
