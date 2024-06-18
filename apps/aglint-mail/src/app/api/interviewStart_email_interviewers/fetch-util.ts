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
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'interviewStart_email_interviewers'>['api_payload'],
) {
  const sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        'session_type,session_duration,schedule_type,name,interview_meeting(start_time,end_time,organizer_id,recruiter_user(first_name,email))',
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

  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('email,first_name,last_name,scheduling_settings')
      .eq('user_id', req_body.recruiter_user_id),
  );

  const int_tz = recruiter_user.scheduling_settings.timeZone.tzCode;

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

  const comp_email_temp = await fetchCompEmailTemp(
    candidateJob.candidates.recruiter_id,
    'interviewStart_email_interviewers',
  );

  const comp_email_placeholder: EmailTemplateAPi<'interviewStart_email_interviewers'>['comp_email_placeholders'] =
    {
      recruiterFirstName: recruiter_user.first_name,
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
      recruiterName: getFullName(
        recruiter_user.first_name,
        recruiter_user.last_name,
      ),
      candidateFirstName: candidateJob.candidates.first_name,
      candidateLastName: candidateJob.candidates.last_name,
      recruiterLastName: recruiter_user.last_name,
      recruiterTimeZone: int_tz,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );

  const react_email_placeholders: EmailTemplateAPi<'interviewStart_email_interviewers'>['react_email_placeholders'] =
    {
      companyLogo: candidateJob.candidates.recruiter.logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
      meetingDetails: meeting_details,
      candidateLink: `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/view?meeting_id=${req_body.meeting_id}&tab=candidate_details`,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: recruiter_user.email,
  };
}
