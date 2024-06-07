import dayjs from 'dayjs';
import type { CalendarEvent } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  durationCalculator,
  platformRemoveUnderscore,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../common/functions';
import type { CandidateInviteConfirmationType } from '../../types/supabase-fetch';
import type { MeetingDetails } from '../../types/apiTypes';
import { createICSAttachment } from '../../ceateIcsContent';

export default async function candidateInviteConfirmation(
  session_ids: string[],
  application_id: string,
  cand_tz: string,
  filter_id?: string,
  schedule_id?: string,
  availability_req_id?: string,
) {
  const sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        'session_type,session_duration,schedule_type,name,interview_meeting(*)',
      )
      .in('id', session_ids),
  );
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,email,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', application_id),
  );

  if (!candidateJob) {
    throw new Error('candidateJob not available');
  }
  if (sessions.length === 0) {
    throw new Error('sessions are not available');
  }

  let meeting_link = '';
  if (availability_req_id) {
    meeting_link = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/request-availability/${availability_req_id}`;
  } else {
    meeting_link = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/invite/${schedule_id}?filter_id=${filter_id}`;
  }

  const mail_attachments = sessions.map((s) => {
    const cal_event = s.interview_meeting.meeting_json as CalendarEvent;
    const cand_cal_event_name = `Interview Invite: ${candidateJob.public_jobs.job_title} at ${candidateJob.public_jobs.company}`;
    const meeting_info =
      `<h3>${s.name}</h3>` +
      `<p> Duration ${s.session_duration} </p>` +
      `<p> meeting place ${s.schedule_type} </p>` +
      `<p> meeting link ${s.interview_meeting.meeting_link} </p>` +
      `<p><a href='${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${schedule_id}?filter_id=${filter_id}'>View Details</a></p>`;
    return createICSAttachment(
      cal_event,
      cand_cal_event_name,
      meeting_info,
      s.interview_meeting.meeting_link,
      s.name,
      cand_tz,
    );
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

  const details: CandidateInviteConfirmationType = {
    recipient_email: email,
    mail_type: 'candidate_invite_confirmation',
    recruiter_id,
    companyLogo: logo,
    payload: {
      '[companyName]': company,
      '[firstName]': first_name,
      '[jobTitle]': job_title,
      'meetingLink': meeting_link,
      'meetingDetails': [...Sessions],
    },
  };

  return { details, mail_attachments };
}
