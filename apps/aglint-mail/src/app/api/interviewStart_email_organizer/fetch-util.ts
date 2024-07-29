import type { DatabaseEnums, EmailTemplateAPi } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  DAYJS_FORMATS,
  fillCompEmailTemplate,
  getFullName,
} from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  durationCalculator,
  platformRemoveUnderscore,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../../../utils/email/common/functions';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import type { MailPayloadType } from '../../../types/app.types';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'interviewStart_email_organizer'>['api_payload'],
) {
  const api_target: DatabaseEnums['email_slack_types'] =
    'interviewStart_email_organizer';

  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,recruiter_id,timezone,recruiter(logo)),public_jobs(job_title,company,recruiter,recruiter_id)',
      )
      .eq('id', req_body.application_id),
  );

  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        'session_type,session_duration,schedule_type,name,interview_meeting(id,start_time,end_time,recruiter_user(first_name,last_name,email,scheduling_settings))',
      )
      .eq('id', req_body.session_id),
  );

  const int_tz =
    recruiter_user.interview_meeting.recruiter_user.scheduling_settings.timeZone
      .tzCode;
  const {
    interview_meeting: { start_time, end_time },
    name,
    schedule_type,
    session_duration,
    session_type,
  } = recruiter_user;

  const organizer = recruiter_user.interview_meeting.recruiter_user;
  const candidate = candidateJob.candidates;
  const public_jobs = candidateJob.public_jobs;

  const meeting_detail: EmailTemplateAPi<'interviewStart_email_organizer'>['react_email_placeholders']['meetingDetail'] =
    {
      date: dayjsLocal(start_time).tz(int_tz).format(DAYJS_FORMATS.DATE_FORMAT),
      time: `${dayjsLocal(start_time).tz(int_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(end_time).tz(int_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)}`,
      sessionType: name,
      platform: platformRemoveUnderscore(schedule_type),
      duration: durationCalculator(session_duration),
      sessionTypeIcon: sessionTypeIcon(session_type),
      meetingIcon: scheduleTypeIcon(schedule_type),
    };
  let mail_payload: MailPayloadType;

  if (req_body.payload) {
    mail_payload = {
      from_name: '',
      ...req_body.payload,
    };
  } else {
    const comp_email_temp = await fetchCompEmailTemp(
      candidateJob.candidates.recruiter_id,
      api_target,
    );

    mail_payload = {
      ...comp_email_temp,
    };
  }

  const comp_email_placeholder: EmailTemplateAPi<'interviewStart_email_organizer'>['comp_email_placeholders'] =
    {
      organizerName: getFullName(organizer.first_name, organizer.last_name),
      organizerFirstName: organizer.first_name,
      organizerLastName: organizer.last_name,
      OrganizerTimeZone: int_tz,
      candidateName: getFullName(candidate.first_name, candidate.last_name),
      jobRole: public_jobs.job_title,
      companyName: public_jobs.company,
      candidateFirstName: candidate.first_name,
      candidateLastName: candidate.last_name,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    mail_payload,
  );

  const candLink = recruiter_user.interview_meeting.id
    ? `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/view?meeting_id=${recruiter_user.interview_meeting.id}&tab=candidate_details`
    : '';

  const react_email_placeholders: EmailTemplateAPi<'interviewStart_email_organizer'>['react_email_placeholders'] =
    {
      companyLogo: candidate.recruiter.logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
      meetingDetail: meeting_detail,
      candidateLink: candLink,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: organizer.email,
  };
}
