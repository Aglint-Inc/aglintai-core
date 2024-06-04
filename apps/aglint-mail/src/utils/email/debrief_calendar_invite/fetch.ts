import dayjs from 'dayjs';
import { supabaseAdmin } from '../../../supabase/supabaseAdmin';
import {
  DurationCalculator,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../common/functions';

export default async function DebriefCalenderInvite(
  session_id: string,
  application_id: string,
  meeting_id: string,
) {
  const { data: session } = await supabaseAdmin
    .from('interview_session')
    .select(
      'session_type,session_duration,schedule_type,name,interview_meeting(start_time,end_time)',
    )
    .eq('id', session_id);
  const {
    data: [candidateJob],
  } = await supabaseAdmin
    .from('applications')
    .select(
      'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
    )
    .eq('id', application_id);
  const [
    {
      interview_meeting: { start_time, end_time },
      name,
      schedule_type,
      session_duration,
      session_type,
    },
  ] = session;
  const Session = {
    date: dayjs(start_time).format('ddd MMMM DD, YYYY'),
    time: `${dayjs(start_time).format('hh:mm A')} - ${dayjs(end_time).format('hh:mm A')}`,
    sessionType: name,
    platform: schedule_type,
    duration: DurationCalculator(session_duration),
    sessionTypeIcon: sessionTypeIcon(session_type),
    meetingIcon: scheduleTypeIcon(schedule_type),
  };
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
    mail_type: 'debrief_calendar_invite',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[companyName]': company,
      '[firstName]': first_name,
      '[jobTitle]': job_title,
      'meetingLink': `${process.env.BASE_URL}/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`,
      'meetingDetail': Session,
    },
  };
  return body;
}
