import type { EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';
import { DAYJS_FORMATS, getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

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

  if (!sessions) {
    throw new Error('sessions are not available');
  }
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,timezone,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', req_body.application_id),
  );

  if (!candidateJob) {
    throw new Error('candidate and job details are not available');
  }
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
      '{{ recruiterName }}': recruiter_user.first_name,
      '{{ candidateName }}': getFullName(
        candidateJob.candidates.first_name,
        candidateJob.candidates.last_name,
      ),
      '{{ jobTitle }}': candidateJob.public_jobs.job_title,
      '{{ companyName }}': candidateJob.public_jobs.company,
      '{{ time }}': dayjsLocal(sessions[0].interview_meeting.start_time)
        .tz(int_tz)
        .format(DAYJS_FORMATS.END_TIME_FORMAT),
      '{{ date }}': dayjsLocal(sessions[0].interview_meeting.start_time)
        .tz(int_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      '{{ recruiterFullName }}': getFullName(
        recruiter_user.first_name,
        recruiter_user.last_name,
      ),
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

// {
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637",
//   "meeting_id": "8daab34c-9c19-445b-aa96-3b4735307414",
//   "recruiter_user_ids": ["7f6c4cae-78b6-4eb6-86fd-9a0e0310147b", "a0e4d0db-7492-48c3-bbc9-a8f7d8340f7f"]
// }
