import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import type { CalendarEvent, EmailTemplateAPi } from '@aglint/shared-types';
import {
  DAYJS_FORMATS,
  fillCompEmailTemplate,
  getFullName,
} from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
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
  } else {
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

  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'confirmInterview_email_applicant',
  );
  const cand_tz = 'America/Los_Angeles';

  const meeting_details = int_sessions.map((int_session) => {
    return {
      date: dayjsLocal(int_session.interview_meeting.start_time)
        .tz(cand_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      time: `${dayjsLocal(int_session.interview_meeting.start_time).tz(cand_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(int_session.interview_meeting.end_time).tz(cand_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)} `,
      sessionType: int_session.name,
      platform: platformRemoveUnderscore(int_session.schedule_type),
      duration: durationCalculator(int_session.session_duration),
      sessionTypeIcon: sessionTypeIcon(int_session.session_type),
      meetingIcon: scheduleTypeIcon(int_session.schedule_type),
    };
  });

  const mail_attachments = int_sessions.map((s) => {
    const cal_event = s.interview_meeting.meeting_json as CalendarEvent;
    const cand_cal_event_name = `Interview Invite: ${job_title} at ${company}`;
    const meeting_info =
      `<h3>${s.name}</h3>` +
      `<p> Duration ${s.session_duration} </p>` +
      `<p> meeting place ${s.schedule_type} </p>` +
      `<p> meeting link ${s.interview_meeting.meeting_link} </p>` +
      `<p><a href=${cand_link}`;
    return createICSAttachment(
      cal_event,
      cand_cal_event_name,
      meeting_info,
      s.interview_meeting.meeting_link,
      s.name,
      cand_tz,
    );
  });

  const comp_email_placeholder: EmailTemplateAPi<'confirmInterview_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      companyName: company,
      jobRole: job_title,
      OrganizerFirstName: meeting_organizer.first_name,
      OrganizerLastName: meeting_organizer.last_name,
      OrganizerTimeZone: recruiter_tz,
      OrganizerName: getFullName(
        meeting_organizer.first_name,
        meeting_organizer.first_name,
      ),
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );
  const react_email_placeholders: EmailTemplateAPi<'confirmInterview_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
      candidateLink: cand_link,
      meetingDetails: meeting_details,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: cand_email,
    mail_attachments,
  };
}
