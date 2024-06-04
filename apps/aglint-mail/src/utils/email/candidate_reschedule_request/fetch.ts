import dayjs from 'dayjs';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  durationCalculator,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../common/functions';
import type { CandidateRescheduleRequestType } from '../../types/supabase-fetch';

export default async function candidateRescheduleRequest(
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
    throw new Error('candidate and job details are not available');
  }

  const {
    data: [session_cancel],
  } = await supabaseAdmin
    .from('interview_session_cancel')
    .select('other_details,reason')
    .eq('id', interview_cancel_id);
  const {
    other_details: {
      dateRange: { start, end },
    },
    reason,
  }: any = session_cancel;

  const {
    candidates: {
      email,
      recruiter_id,
      first_name,
      recruiter: { name: recruiterName, logo },
    },
    public_jobs: { company, job_title },
  } = candidateJob;
  const Sessions = sessions.map((session) => {
    const {
      interview_meeting: { start_time, end_time },
      name,
      schedule_type,
      session_duration,
      session_type,
    } = session;
    return {
      date: dayjs(start_time).format('ddd MMMM DD, YYYY'),
      Time: `${dayjs(start_time).format('hh:mm A')} - ${dayjs(end_time).format('hh:mm A')}`,
      sessionType: name,
      platform: schedule_type,
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
      '[scheduleName]': recruiterName,
      '[companyName]': company,
      '[jobTitle]': job_title,
      '[DateTime]': `${dayjs(start).format('DD MMMM YYYY')} to ${dayjs(end).format('DD MMMM YYYY')}`,
      '[pickYourSlotLink]': `https://dev.aglinthq.com/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`,
      'meetingDetails': [...Sessions],
    },
  };
  return body;
}
