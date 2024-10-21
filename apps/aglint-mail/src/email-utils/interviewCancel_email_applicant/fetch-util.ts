import type {
  EmailTemplateAPi,
  MeetingDetailCardType,
} from '@aglint/shared-types';
import { DAYJS_FORMATS, getFullName, supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  durationCalculator,
  platformRemoveUnderscore,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../../utils/email/common/functions';
import type { FetchUtilType } from '../../types/emailfetchUtil';

export const fetchUtil: FetchUtilType<
  'interviewCancel_email_applicant'
> = async (supabaseAdmin, req_body) => {
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
        'candidates(first_name,last_name,email,timezone,recruiter_id,recruiter(logo,name)),public_jobs(id,job_title)',
      )
      .eq('id', req_body.application_id),
  );

  const meeting_organizer = int_sessions[0].interview_meeting.recruiter_user;

  const org_tz = meeting_organizer.scheduling_settings.timeZone.tzCode;

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

  const { candidates, public_jobs } = candidateJob;

  const comp_email_placeholder: EmailTemplateAPi<'interviewCancel_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: candidates.first_name,
      companyName: candidates.recruiter.name,
      jobRole: public_jobs.job_title,
      organizerName: getFullName(
        meeting_organizer.first_name,
        meeting_organizer.last_name,
      ),
      candidateLastName: candidates.last_name,
      candidateName: getFullName(candidates.first_name, candidates.last_name),
      organizerFirstName: meeting_organizer.first_name,
      organizerLastName: meeting_organizer.last_name,
      OrganizerTimeZone: org_tz,
    };

  const react_email_placeholders: EmailTemplateAPi<'interviewCancel_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: candidateJob.candidates.recruiter.logo,
      meetingDetails: meeting_details,
    };

  return {
    mail_data: {
      comp_email_placeholder,
      company_id: candidateJob.candidates.recruiter_id,
      react_email_placeholders,
      recipient_email: candidates.email,
    },
    candidate_portal_payload: {
      application_id: req_body.application_id,
      type: 'interviewCancel_email_applicant',
    },
  };
};
