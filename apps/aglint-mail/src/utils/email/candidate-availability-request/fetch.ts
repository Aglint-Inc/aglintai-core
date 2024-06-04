import dayjs from 'dayjs';
import { supabaseAdmin } from '../../../supabase/supabaseAdmin';
import {
  DurationCalculator,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../common/functions';

export default async function CandidateAvailabilityRequest(
  session_ids: string[],
  application_id: string,
  schedule_id: string,
  filter_id: string,
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
      'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(company)',
    )
    .eq('id', application_id);

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
      time: `${dayjs(start_time).format('hh:mm A')} - ${dayjs(end_time).format('hh:mm A')}`,
      sessionType: name,
      platform: schedule_type,
      duration: DurationCalculator(session_duration),
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

  const body = {
    recipient_email: email,
    mail_type: 'candidate_availability_request',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[companyName]': company,
      '[firstName]': first_name,
      'pickYourSlot': `https://dev.aglinthq.com/scheduling/invite/${schedule_id}?filter_id=${filter_id}`,
      'meetingDetails': [...Sessions],
    },
  };

  return body;
}
