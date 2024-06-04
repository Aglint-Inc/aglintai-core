import dayjs from 'dayjs';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  durationCalculator,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../common/functions';
import type { DebriefCalendarInviteBodyType } from '../../types/supabase-fetch';
import type { MeetingDetails } from '../../types/apiTypes';

export default async function debriefCalenderInvite(
  session_id: string,
  application_id: string,
  meeting_id: string,
  recruiter_user_id: string,
) {
  const [session] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        'session_type,session_duration,schedule_type,name,interview_meeting(start_time,end_time)',
      )
      .eq('id', session_id),
  );

  if (!session) {
    throw new Error('session not available');
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
    throw new Error('candidate and job details are not available');
  }
  const [teamMember] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name')
      .eq('user_id', recruiter_user_id),
  );

  if (!teamMember) {
    throw new Error('recruiter user detail not available');
  }

  const teamMemberName = teamMember.first_name;
  const {
    interview_meeting,
    name,
    schedule_type,
    session_duration,
    session_type,
  } = session;
  const Session: MeetingDetails = {
    date: dayjs(interview_meeting.start_time).format('ddd MMMM DD, YYYY'),
    time: `${dayjs(interview_meeting.start_time).format('hh:mm A')} - ${dayjs(interview_meeting.end_time).format('hh:mm A')}`,
    sessionType: name,
    platform: session.schedule_type,
    duration: durationCalculator(session_duration),
    sessionTypeIcon: sessionTypeIcon(session_type),
    meetingIcon: scheduleTypeIcon(schedule_type),
  };

  const { candidates, public_jobs } = candidateJob;

  const body: DebriefCalendarInviteBodyType = {
    recipient_email: candidates.email,
    mail_type: 'debrief_calendar_invite',
    recruiter_id: candidates.recruiter_id,
    companyLogo: candidates.recruiter.logo,
    payload: {
      '[teamMemberName]': teamMemberName,
      '[companyName]': public_jobs.company,
      '[firstName]': candidates.first_name,
      '[jobTitle]': public_jobs.job_title,
      'meetingLink': `${process.env.BASE_URL}/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`,
      'meetingDetail': Session,
    },
  };

  return body;
}
