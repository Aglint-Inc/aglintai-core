import { DAYJS_FORMATS, getFullName } from '@aglint/shared-utils';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'confInterview_email_organizer'>['api_payload'],
) {
  const int_sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        'session_type,session_duration,schedule_type,name,interview_meeting(start_time,end_time, recruiter_user(first_name,last_name,scheduling_settings,email))',
      )
      .in('id', req_body.session_ids),
  );
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,recruiter_id,timezone,recruiter(logo,name)),public_jobs(job_title)',
      )
      .eq('id', req_body.application_id),
  );
  const organizer = int_sessions[0].interview_meeting.recruiter_user;
  const {
    candidates: {
      recruiter_id,
      first_name,
      last_name,
      recruiter: { logo, name: companyName },
    },
    public_jobs,
  } = candidateJob;

  const org_tz = organizer.scheduling_settings.timeZone.tzCode;

  return int_sessions.map((int_session) => {
    const comp_email_placeholder: EmailTemplateAPi<'confInterview_email_organizer'>['comp_email_placeholders'] =
      {
        candidateFirstName: first_name,
        candidateLastName: last_name,
        candidateName: getFullName(first_name, last_name),
        organizerFirstName: organizer.first_name,
        organizerLastName: organizer.last_name,
        organizerName: getFullName(organizer.first_name, organizer.last_name),
        OrganizerTimeZone: org_tz,
        companyName: companyName,
        jobRole: public_jobs.job_title,
      };

    const candidateLink = req_body.application_id
      ? `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/application/${req_body.application_id}`
      : '';
    const react_email_placeholders: EmailTemplateAPi<'confInterview_email_organizer'>['react_email_placeholders'] =
      {
        companyLogo: logo,
        meetingDetails: {
          date: dayjsLocal(int_session.interview_meeting.start_time)
            .tz(org_tz)
            .format(DAYJS_FORMATS.DATE_FORMAT),
          time: `${dayjsLocal(int_session.interview_meeting.start_time).tz(org_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(int_session.interview_meeting.end_time).tz(org_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)}`,
          sessionType: int_session.name,
          platform: platformRemoveUnderscore(int_session.schedule_type),
          duration: durationCalculator(int_session.session_duration),
          sessionTypeIcon: sessionTypeIcon(int_session.session_type),
          meetingIcon: scheduleTypeIcon(int_session.schedule_type),
        },
        candidateDetails: candidateLink,
      };
    return {
      comp_email_placeholder,
      company_id: recruiter_id,
      react_email_placeholders,
      recipient_email: int_session.interview_meeting.recruiter_user.email,
    };
  });
}
