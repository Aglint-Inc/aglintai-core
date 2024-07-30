import type { EmailTemplateAPi } from '@aglint/shared-types';
import { DAYJS_FORMATS, getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'interviewStart_email_interviewers'>['api_payload'],
) {
  const sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        'session_type,session_duration,schedule_type,name,interview_meeting(start_time,end_time,organizer_id,recruiter_user(first_name,last_name,scheduling_settings,email))',
      )
      .eq('meeting_id', req_body.meeting_id),
  );

  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,timezone,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', req_body.application_id),
  );

  const [meeting_interviewer] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('email,first_name,last_name,scheduling_settings')
      .eq('user_id', req_body.recruiter_user_id),
  );
  const organizer = sessions[0].interview_meeting.recruiter_user;

  const int_tz = meeting_interviewer.scheduling_settings.timeZone.tzCode;

  const meeting_details: EmailTemplateAPi<'interviewStart_email_interviewers'>['react_email_placeholders']['meetingDetails'] =
    sessions.map((session) => {
      const {
        interview_meeting: { start_time, end_time },
        name,
        schedule_type,
        session_duration,
        session_type,
      } = session;
      return {
        date: dayjsLocal(start_time)
          .tz(int_tz)
          .format(DAYJS_FORMATS.DATE_FORMAT),
        time: `${dayjsLocal(start_time).tz(int_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(end_time).tz(int_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)}`,
        sessionType: name,
        platform: platformRemoveUnderscore(schedule_type),
        duration: durationCalculator(session_duration),
        sessionTypeIcon: sessionTypeIcon(session_type),
        meetingIcon: scheduleTypeIcon(schedule_type),
      };
    });

  const comp_email_placeholder: EmailTemplateAPi<'interviewStart_email_interviewers'>['comp_email_placeholders'] =
    {
      organizerFirstName: organizer.first_name,
      candidateName: getFullName(
        candidateJob.candidates.first_name,
        candidateJob.candidates.last_name,
      ),
      jobRole: candidateJob.public_jobs.job_title,
      companyName: candidateJob.public_jobs.company,
      time: dayjsLocal(sessions[0].interview_meeting.start_time)
        .tz(int_tz)
        .format(DAYJS_FORMATS.END_TIME_FORMAT),
      startDate: dayjsLocal(sessions[0].interview_meeting.start_time)
        .tz(int_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      endDate: dayjsLocal(sessions[0].interview_meeting.end_time)
        .tz(int_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      organizerName: getFullName(organizer.first_name, organizer.last_name),
      candidateFirstName: candidateJob.candidates.first_name,
      candidateLastName: candidateJob.candidates.last_name,
      organizerLastName: organizer.last_name,
      OrganizerTimeZone: organizer.scheduling_settings.timeZone.tzCode,
      interviewerFirstName: meeting_interviewer.first_name,
      interviewerLastName: meeting_interviewer.last_name,
      interviewerName: getFullName(
        meeting_interviewer.first_name,
        meeting_interviewer.last_name,
      ),
    };

  const candLink = req_body.meeting_id
    ? `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/view?meeting_id=${req_body.meeting_id}&tab=candidate_details`
    : '';

  const react_email_placeholders: EmailTemplateAPi<'interviewStart_email_interviewers'>['react_email_placeholders'] =
    {
      companyLogo: candidateJob.candidates.recruiter.logo,
      meetingDetails: meeting_details,
      candidateLink: candLink,
    };

  return {
    comp_email_placeholder,
    company_id: candidateJob.candidates.recruiter_id,
    react_email_placeholders,
    recipient_email: meeting_interviewer.email,
  };
}
