import type {
  EmailTemplateAPi,
  MeetingDetailCardType,
  SupabaseType,
} from '@aglint/shared-types';
import { DAYJS_FORMATS, getFullName, supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';

export async function fetchUtil(
  supabaseAdmin: SupabaseType,
  req_body: EmailTemplateAPi<'debrief_email_interviewer'>['api_payload'],
) {
  const [session] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        '*,interview_meeting(*, recruiter_user(first_name,last_name,email,scheduling_settings))',
      )
      .eq('id', req_body.session_id),
  );

  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,timezone,recruiter_id,recruiter(logo,name)),public_jobs(job_title)',
      )
      .eq('id', req_body.application_id),
  );

  const { candidates, public_jobs } = candidateJob;

  const debrief_email_interviewers = supabaseWrap(
    await supabaseAdmin
      .from('debreif_meeting_interviewers')
      .select('email,first_name,last_name')
      .eq('session_id', req_body.session_id),
  );

  const meeting_organizer = session.interview_meeting.recruiter_user;

  const org_tz =
    session.interview_meeting.recruiter_user.scheduling_settings.timeZone
      .tzCode;
  const {
    interview_meeting,
    name,
    schedule_type,
    session_duration,
    session_type,
  } = session;
  const meeting_detail: MeetingDetailCardType = {
    date: dayjsLocal(interview_meeting.start_time)
      .tz(org_tz)
      .format(DAYJS_FORMATS.DATE_FORMAT),
    time: `${dayjsLocal(interview_meeting.start_time).tz(org_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(interview_meeting.end_time).tz(org_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)}`,
    sessionType: name,
    platform: platformRemoveUnderscore(session.schedule_type),
    duration: durationCalculator(session_duration),
    sessionTypeIcon: sessionTypeIcon(session_type),
    meetingIcon: scheduleTypeIcon(schedule_type),
  };

  const interviewers_mail_data = debrief_email_interviewers.map((inter) => {
    const comp_email_placeholder: EmailTemplateAPi<'debrief_email_interviewer'>['comp_email_placeholders'] =
      {
        candidateName: getFullName(candidates.first_name, candidates.last_name),
        candidateLastName: candidates.last_name,
        candidateFirstName: candidates.first_name,
        jobRole: public_jobs.job_title,
        companyName: candidates.recruiter.name,
        interviewerFirstName: inter.first_name,
        interviewerLastName: inter.last_name,
        interviewerName: getFullName(inter.first_name, inter.last_name),
        organizerFirstName: meeting_organizer.first_name,
        organizerLastName: meeting_organizer.last_name,
        OrganizerTimeZone: org_tz,
        organizerName: getFullName(
          meeting_organizer.first_name,
          meeting_organizer.first_name,
        ),
      };

    const candidateLink = req_body.application_id
      ? `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/application/${req_body.application_id}`
      : '';

    const react_email_placeholders: EmailTemplateAPi<'debrief_email_interviewer'>['react_email_placeholders'] =
      {
        companyLogo: candidateJob.candidates.recruiter.logo,
        meetingDetails: meeting_detail,
        candidateLink,
      };

    return {
      company_id: candidateJob.candidates.recruiter_id,
      comp_email_placeholder,
      react_email_placeholders,
      recipient_email: inter.email,
    };
  });

  return {
    interviewers_mail_data,
  };
}
