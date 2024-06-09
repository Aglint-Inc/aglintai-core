import dayjs from 'dayjs';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';
import type { MeetingDetails } from '../../../utils/types/apiTypes';
import type { CancelInterviewSessionType } from '../../../utils/types/supabase-fetch';

export default async function cancelInterviewSession(
  session_ids: string[],
  application_id: string,
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
    throw new Error('sessions detail not avalible');
  }

  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', application_id),
  );
  if (!candidateJob) {
    throw new Error(
      'candidate details and job details are details not avalible',
    );
  }

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

  const {
    candidates: {
      email,
      recruiter_id,
      first_name,
      recruiter: { logo },
    },
    public_jobs: { company, job_title },
  } = candidateJob;

  const body: CancelInterviewSessionType = {
    recipient_email: email,
    mail_type: 'cancel_interview_session',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[firstName]': first_name,
      '[companyName]': company,
      '[jobTitle]': job_title,
      'meetingDetails': [...Sessions],
    },
  };

  return body;
}
