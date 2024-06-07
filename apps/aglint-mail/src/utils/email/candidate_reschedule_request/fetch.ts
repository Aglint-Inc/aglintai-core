import dayjs from 'dayjs';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  durationCalculator,
  platformRemoveUnderscore,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../common/functions';
import type { CandidateRescheduleRequestType } from '../../types/supabase-fetch';
import type { MeetingDetails } from '../../types/apiTypes';

interface SessionCancel {
  other_details: {
    note: string;
    dateRange: { start: string; end: string };
  };
  reason;
}

export default async function candidateRescheduleRequest(
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
    throw new Error('candidate and job details are not available');
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

  const { first_name: recruiter_name, email } = recruiter_user;

  const [session_cancel] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_cancel')
      .select('other_details,reason')
      .eq('id', interview_cancel_id),
  );

  const {
    other_details: {
      note,
      dateRange: { start, end },
    },
    reason,
  } = session_cancel as unknown as SessionCancel;

  const {
    candidates: {
      recruiter_id,
      first_name,
      recruiter: { logo },
    },
    public_jobs: { company, job_title },
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
  const body: CandidateRescheduleRequestType = {
    recipient_email: email,
    mail_type: 'candidate_reschedule_request',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[firstName]': first_name,
      '[rescheduleReason]': reason,
      '[recruiterName]': recruiter_name,
      '[companyName]': company,
      '[jobTitle]': job_title,
      '[additionalRescheduleNotes]': note,
      '[dateRange]': `${dayjs(start).format('DD MMMM YYYY')} to ${dayjs(end).format('DD MMMM YYYY')}`,
      '[pickYourSlotLink]': `https://dev.aglinthq.com/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`,
      'meetingDetails': [...Sessions],
    },
  };
  return body;
}
