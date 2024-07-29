import type {
  DatabaseEnums,
  EmailTemplateAPi,
  MeetingDetailCardType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  DAYJS_FORMATS,
  fillCompEmailTemplate,
  getFullName,
} from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import {
  durationCalculator,
  platformRemoveUnderscore,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../../../utils/email/common/functions';
import type { MailPayloadType } from '../../../types/app.types';

export async function dbFetch(
  req_body: EmailTemplateAPi<'interviewStart_email_applicant'>['api_payload'],
) {
  const api_target: DatabaseEnums['email_slack_types'] =
    'interviewStart_email_applicant';

  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,email,recruiter_id,recruiter(logo),timezone),public_jobs(job_title,company)',
      )
      .eq('id', req_body.application_id),
  );
  const [meeting_details] = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select()
      .eq('id', req_body.meeting_id),
  );

  const [meeting_organizer] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select()
      .eq('user_id', meeting_details.organizer_id),
  );

  const recruiter_tz = meeting_organizer.scheduling_settings.timeZone.tzCode;
  const {
    candidates: {
      email,
      recruiter_id,
      first_name,
      last_name,
      recruiter: { logo },
    },
    public_jobs: { company, job_title },
  } = candidateJob;

  let mail_payload: MailPayloadType;

  if (req_body.payload) {
    mail_payload = {
      from_name: '',
      ...req_body.payload,
    };
  } else {
    const comp_email_temp = await fetchCompEmailTemp(recruiter_id, api_target);

    mail_payload = {
      ...comp_email_temp,
    };
  }

  // const cand_tz = 'America/Los_angeles';
  const rec_tz = meeting_organizer.scheduling_settings.timeZone.tzCode;

  const comp_email_placeholder: EmailTemplateAPi<'interviewStart_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      candidateLastName: last_name,
      jobRole: job_title,
      candidateName: company,
      organizerName: getFullName(
        meeting_organizer.first_name,
        meeting_organizer.last_name,
      ),
      startDate: dayjsLocal(meeting_details.start_time)
        .tz(rec_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      time: dayjsLocal(meeting_details.start_time)
        .tz(rec_tz)
        .format(DAYJS_FORMATS.END_TIME_FORMAT),
      endDate: dayjsLocal(meeting_details.end_time)
        .tz(rec_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      companyName: company,
      organizerFirstName: meeting_organizer.first_name,
      organizerLastName: meeting_organizer.last_name,
      OrganizerTimeZone: recruiter_tz,
    };
  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    mail_payload,
  );

  const meeting_detail_card: MeetingDetailCardType = {
    date: dayjsLocal(meeting_details.start_time)
      .tz(rec_tz)
      .format(DAYJS_FORMATS.DATE_FORMAT),
    time: `${dayjsLocal(meeting_details.start_time).tz(rec_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(meeting_details.end_time).tz(rec_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)}`,
    sessionType: meeting_details.session_name,
    platform: platformRemoveUnderscore(meeting_details.schedule_type),
    duration: durationCalculator(meeting_details.session_duration),
    sessionTypeIcon: sessionTypeIcon(meeting_details.session_type),
    meetingIcon: scheduleTypeIcon(meeting_details.schedule_type),
  };

  const react_email_placeholders: EmailTemplateAPi<'interviewStart_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
      meetingDetail: meeting_detail_card,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: email,
  };
}
