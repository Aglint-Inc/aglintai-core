import dayjs from 'dayjs';
import { supabaseAdmin } from '../../../supabase/supabaseAdmin';
import {
  DurationCalculator,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../common/functions';

export default async function Index(
  session_ids: string[],
  application_id: string,
  meeting_id: string,
  interview_cancel_id: string,
) {
  const { data: sessions } = await supabaseAdmin
    .from('interview_session')
    .select(
      'session_type,session_duration,schedule_type,name,interview_meeting(start_time,end_time)',
    )
    .in('id', session_ids);
  const {
    data: [candidateJob],
  } = await supabaseAdmin
    .from('applications')
    .select(
      'candidates(first_name,email,recruiter_id,recruiter(name)),public_jobs(recruiter(logo),job_title,company)',
    )
    .eq('id', application_id);

  const {
    data: [session_cancel],
  } = await supabaseAdmin
    .from('interview_session_cancel')
    .select('reason')
    .eq('id', interview_cancel_id);

  const {
    candidates: {
      email,
      recruiter_id,
      first_name,
      recruiter: { name: recruiterName },
    },
    public_jobs: {
      company,
      recruiter: { logo },
    },
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
      duration: DurationCalculator(session_duration),
      sessionTypeIcon: sessionTypeIcon(session_type),
      meetingIcon: scheduleTypeIcon(schedule_type),
    };
  });
  const body = {
    recipient_email: email,
    mail_type: 'candidate_cancel_request',
    recruiter_id,
    company_logo: logo,
    payload: {
      '[firstName]': first_name,
      '[rescheduleReason]': session_cancel.reason,
      '[recruiterName]': recruiterName,
      '[companyName]': company,
      '[pickYourSlotLink]': `https://dev.aglinthq.com/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`,
      'meetingDetails': [...Sessions],
    },
  };
  return body;
}
