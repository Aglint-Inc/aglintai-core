import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { DAYJS_FORMATS, getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';
import { createICSAttachment } from '../../../utils/ceateIcsContent';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'confirmInterview_email_applicant'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,email,recruiter_id,recruiter(logo),timezone),public_jobs(job_title,company)',
      )
      .eq('id', req_body.application_id),
  );

  const int_sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        '*,interview_meeting(*, recruiter_user(first_name,last_name,scheduling_settings))',
      )
      .in('id', req_body.session_ids),
  );
  const meeting_organizer = int_sessions[0].interview_meeting.recruiter_user;
  let cand_link = '';
  if (req_body.availability_req_id) {
    cand_link = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/request-availability/${req_body.availability_req_id}`;
  } else if (req_body.filter_id) {
    cand_link = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/invite/${req_body.schedule_id}?filter_id=${req_body.filter_id}`;
  }
  const recruiter_tz = meeting_organizer.scheduling_settings.timeZone.tzCode;
  const {
    candidates: {
      email: cand_email,
      recruiter_id,
      first_name,
      last_name,
      recruiter: { logo },
    },
    public_jobs: { company, job_title },
  } = candidateJob;

  const meeting_details = int_sessions.map((int_session, idx) => {
    let meeting_start_time = int_session.interview_meeting.start_time;
    let meeting_end_time = int_session.interview_meeting.end_time;

    if (req_body.preview_details) {
      meeting_start_time =
        req_body.preview_details.meeting_timings[idx].meeting_start_time;
      meeting_end_time =
        req_body.preview_details.meeting_timings[idx].meeting_end_time;
    }
    return {
      date: dayjsLocal(meeting_start_time)
        .tz(recruiter_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      time: `${dayjsLocal(meeting_start_time).tz(recruiter_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(meeting_end_time).tz(recruiter_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)} `,
      sessionType: int_session.name,
      platform: platformRemoveUnderscore(int_session.schedule_type),
      duration: durationCalculator(int_session.session_duration),
      sessionTypeIcon: sessionTypeIcon(int_session.session_type),
      meetingIcon: scheduleTypeIcon(int_session.schedule_type),
    };
  });

  const mail_attachments = int_sessions.map((s, idx) => {
    let meeting_start_time = s.interview_meeting.start_time;
    let meeting_end_time = s.interview_meeting.end_time;

    if (req_body.preview_details) {
      meeting_start_time =
        req_body.preview_details.meeting_timings[idx].meeting_start_time;
      meeting_end_time =
        req_body.preview_details.meeting_timings[idx].meeting_end_time;
    }
    const cand_cal_event_name = `Interview Invite: ${job_title} at ${company}`;
    const meeting_info =
      `<h3>${s.name}</h3>` +
      `<p> Duration ${s.session_duration} </p>` +
      `<p> meeting place ${s.schedule_type} </p>` +
      `<p> meeting link ${s.interview_meeting.meeting_link} </p>` +
      `<p><a href=${cand_link}`;
    return createICSAttachment(
      meeting_start_time,
      meeting_end_time,
      cand_cal_event_name,
      meeting_info,
      s.interview_meeting.meeting_link,
      s.name,
      recruiter_tz,
    );
  });

  const comp_email_placeholder: EmailTemplateAPi<'confirmInterview_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      companyName: company,
      jobRole: job_title,
      organizerFirstName: meeting_organizer.first_name,
      organizerLastName: meeting_organizer.last_name,
      OrganizerTimeZone: recruiter_tz,
      organizerName: getFullName(
        meeting_organizer.first_name,
        meeting_organizer.first_name,
      ),
    };

  const react_email_placeholders: EmailTemplateAPi<'confirmInterview_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: logo,
      candidateLink: cand_link,
      meetingDetails: meeting_details,
    };

  return {
    company_id: recruiter_id,
    comp_email_placeholder,
    react_email_placeholders,
    recipient_email: cand_email,
    mail_attachments,
  };
}
