import type {
  EmailTemplateAPi,
  MeetingDetailCardType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { DAYJS_FORMATS, getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'rescheduleSelfSchedule_email_applicant'>['api_payload'],
) {
  const { self_schedule_link } = req_body;

  const int_sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        '*,interview_meeting(*, recruiter_user(first_name,last_name,email,scheduling_settings))',
      )
      .in('id', req_body.session_ids),
  );
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,email,recruiter_id,recruiter(logo,name)),public_jobs(job_title)',
      )
      .eq('id', req_body.application_id),
  );
  const meeting_organizer = int_sessions[0].interview_meeting.recruiter_user;
  const org_tz = meeting_organizer.scheduling_settings.timeZone.tzCode;
  const {
    candidates: {
      email: cand_email,
      recruiter_id,
      first_name,
      last_name,
      recruiter: { logo, name: companyName },
    },
    public_jobs: { job_title },
  } = candidateJob;

  const meeting_details: MeetingDetailCardType[] = int_sessions.map(
    (session) => {
      const {
        interview_meeting: { start_time, end_time },
        name,
        schedule_type,
        session_duration,
        session_type,
      } = session;
      return {
        date: dayjsLocal(start_time)
          .tz(org_tz)
          .format(DAYJS_FORMATS.DATE_FORMAT),
        time: `${dayjsLocal(start_time).tz(org_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(end_time).tz(org_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)}`,
        sessionType: name,
        platform: platformRemoveUnderscore(schedule_type),
        duration: durationCalculator(session_duration),
        sessionTypeIcon: sessionTypeIcon(session_type),
        meetingIcon: scheduleTypeIcon(schedule_type),
      };
    },
  );

  const comp_email_placeholder: EmailTemplateAPi<'rescheduleSelfSchedule_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      jobRole: job_title,
      companyName: companyName,
      organizerName: getFullName(
        meeting_organizer.first_name,
        meeting_organizer.last_name,
      ),
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      organizerFirstName: meeting_organizer.first_name,
      organizerLastName: meeting_organizer.last_name,
      OrganizerTimeZone: org_tz,
    };

  const react_email_placeholders: EmailTemplateAPi<'rescheduleSelfSchedule_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: logo,
      meetingDetails: meeting_details,
      resheduleLink: self_schedule_link ? self_schedule_link : '',
    };

  return {
    comp_email_placeholder,
    company_id: recruiter_id,
    react_email_placeholders,
    recipient_email: cand_email,
  };
}
