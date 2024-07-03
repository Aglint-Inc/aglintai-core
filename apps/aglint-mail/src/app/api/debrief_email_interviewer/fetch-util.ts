import type {
  EmailTemplateAPi,
  MeetingDetailCardType,
} from '@aglint/shared-types';
import {
  DAYJS_FORMATS,
  fillCompEmailTemplate,
  getFullName,
} from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';

export async function fetchUtil(
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
        'candidates(first_name,last_name,timezone,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
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

  const comp_email_temp = await fetchCompEmailTemp(
    candidateJob.candidates.recruiter_id,
    'debrief_email_interviewer',
  );

  const interviewers_mail_data = debrief_email_interviewers.map((inter) => {
    const comp_email_placeholder: EmailTemplateAPi<'debrief_email_interviewer'>['comp_email_placeholders'] =
      {
        candidateName: getFullName(candidates.first_name, candidates.last_name),
        candidateLastName: candidates.last_name,
        candidateFirstName: candidates.first_name,
        jobRole: public_jobs.job_title,
        companyName: public_jobs.company,
        interviewerFirstName: inter.first_name,
        interviewerLastName: inter.last_name,
        interviewerName: getFullName(inter.first_name, inter.last_name),
      };

    const filled_comp_template = fillCompEmailTemplate(
      comp_email_placeholder,
      comp_email_temp,
    );

    const react_email_placeholders: EmailTemplateAPi<'debrief_email_interviewer'>['react_email_placeholders'] =
      {
        companyLogo: candidateJob.candidates.recruiter.logo,
        emailBody: filled_comp_template.body,
        subject: filled_comp_template.subject,
        meetingDetails: meeting_detail,
        candidateLink: `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/application/${req_body.application_id}`,
      };

    return {
      filled_comp_template,
      react_email_placeholders,
      recipient_email: inter.email,
    };
  });

  return {
    interviewers_mail_data,
  };
}
