import dayjs from 'dayjs';
import { supabaseAdmin } from '../../../supabase/supabaseAdmin';
import {
  DurationCalculator,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../common/functions';

//     application_id: string;
//     session_ids: string[];
//     meeting_id: string;

export default async function Index(
  session_ids: string[],
  application_id: string,
  meeting_id: string,
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
      'candidates(first_name,email,recruiter_id,recruiter(name)),public_jobs(job_title,company)',
    )
    .eq('id', application_id);

  const {
    candidates: {
      email,
      recruiter_id,
      first_name,
      recruiter: { name: recruiter_name },
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
      duration: DurationCalculator(session_duration),
      sessionTypeIcon: sessionTypeIcon(session_type),
      meetingIcon: scheduleTypeIcon(schedule_type),
    };
  });

  const body = {
    recipient_email: email,
    mail_type: 'confirmation_mail_to_organizer',
    recruiter_id,
    payload: {
      '[companyName]': company,
      '[firstName]': first_name,
      '[jobTitle]': job_title,
      '[recruiterName]': recruiter_name,
      'meetingLink': `https://dev.aglinthq.com/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`,
      'meetingDetails': [...Sessions],
    },
  };

  return body;
}

// [recruiterName]
// [firstName]
// [meetingLink]
