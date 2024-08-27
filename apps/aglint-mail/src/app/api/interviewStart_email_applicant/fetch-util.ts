import type {
  EmailTemplateAPi,
  MeetingDetailCardType,
  SupabaseType,
} from '@aglint/shared-types';
import { DAYJS_FORMATS, getFullName, supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  durationCalculator,
  platformRemoveUnderscore,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../../../utils/email/common/functions';

export async function dbFetch(
  supabaseAdmin: SupabaseType,
  req_body: EmailTemplateAPi<'interviewStart_email_applicant'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,email,recruiter_id,recruiter(logo,name),timezone),public_jobs(job_title)',
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
      recruiter: { logo, name: companyName },
    },
    public_jobs: { job_title },
  } = candidateJob;

  // const cand_tz = 'America/Los_angeles';
  const rec_tz = meeting_organizer.scheduling_settings.timeZone.tzCode;

  const comp_email_placeholder: EmailTemplateAPi<'interviewStart_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      candidateLastName: last_name,
      jobRole: job_title,
      candidateName: getFullName(first_name, last_name),
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
      companyName: companyName,
      organizerFirstName: meeting_organizer.first_name,
      organizerLastName: meeting_organizer.last_name,
      OrganizerTimeZone: recruiter_tz,
    };

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
      meetingDetail: meeting_detail_card,
    };

  return {
    comp_email_placeholder,
    company_id: recruiter_id,
    react_email_placeholders,
    recipient_email: email,
  };
}
