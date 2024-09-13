import type { EmailTemplateAPi, SupabaseType } from '@aglint/shared-types';
import { DAYJS_FORMATS, getFullName, supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  durationCalculator,
  platformRemoveUnderscore,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../../utils/email/common/functions';

export async function fetchUtil(
  supabaseAdmin: SupabaseType,
  req_body: EmailTemplateAPi<'meetingDeclined_email_organizer'>['api_payload'],
) {
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,recruiter_id,timezone,recruiter(logo,name)),public_jobs(job_title,recruiter_id)',
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

  const [interviewer] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name')
      .eq('user_id', req_body.interviewer_id),
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

  const public_jobs = candidateJob.public_jobs;
  const candidate = candidateJob.candidates;
  const organizer = recruiter_user.interview_meeting.recruiter_user;

  const meeting_detail: EmailTemplateAPi<'meetingDeclined_email_organizer'>['react_email_placeholders']['meetingDetail'] =
    {
      date: dayjsLocal(start_time).tz(int_tz).format(DAYJS_FORMATS.DATE_FORMAT),
      time: `${dayjsLocal(start_time).tz(int_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(end_time).tz(int_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)}`,
      sessionType: name,
      platform: platformRemoveUnderscore(schedule_type),
      duration: durationCalculator(session_duration),
      sessionTypeIcon: sessionTypeIcon(session_type),
      meetingIcon: scheduleTypeIcon(schedule_type),
    };

  const comp_email_placeholder: EmailTemplateAPi<'meetingDeclined_email_organizer'>['comp_email_placeholders'] =
    {
      organizerName: getFullName(organizer.first_name, organizer.last_name),
      organizerFirstName: organizer.first_name,
      organizerLastName: organizer.last_name,
      OrganizerTimeZone: int_tz,
      jobRole: public_jobs.job_title,
      companyName: candidate.recruiter.name,
      candidateName: getFullName(candidate.first_name, candidate.last_name),
      candidateFirstName: candidate.first_name,
      candidateLastName: candidate.last_name,
      interviewerName: getFullName(
        interviewer.first_name,
        interviewer.last_name,
      ),
      interviewerFirstName: interviewer.first_name,
      interviewerLastName: interviewer.last_name,
      meetingDetailsLink: `<a href="${process.env.NEXT_PUBLIC_APP_URL}/scheduling/view?meeting_id=${recruiter_user.interview_meeting.id}&tab=candidate_details" target="_blank">here</a>`,
    };

  const react_email_placeholders: EmailTemplateAPi<'meetingDeclined_email_organizer'>['react_email_placeholders'] =
    {
      companyLogo: candidate.recruiter.logo,
      meetingDetail: meeting_detail,
    };

  return {
    company_id: candidateJob.candidates.recruiter_id,
    comp_email_placeholder,
    react_email_placeholders,
    recipient_email: organizer.email,
  };
}