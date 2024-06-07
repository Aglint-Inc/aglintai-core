import dayjs from 'dayjs';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  durationCalculator,
  platformRemoveUnderscore,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../common/functions';
import type { ConfiramtionMailToOrganizerType } from '../../types/supabase-fetch';
import type { MeetingDetails } from '../../types/apiTypes';

export default async function confiramtionMailToOrganizer(
  session_ids: string[],
  application_id: string,
  meeting_id: string,
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
    throw new Error('sessions are not available');
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

  const body: ConfiramtionMailToOrganizerType = {
    recipient_email: email,
    mail_type: 'confirmation_mail_to_organizer',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[companyName]': company,
      '[firstName]': first_name,
      '[jobTitle]': job_title,
      '[recruiterName]': recruiter_name,
      'meetingLink': `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`,
      'meetingDetails': [...Sessions],
    },
  };

  return body;
}
