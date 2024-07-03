import type {
  EmailTemplateAPi,
  MeetingDetailCardType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  DAYJS_FORMATS,
  fillCompEmailTemplate,
  getFullName,
} from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'interviewCancel_email_applicant'>['api_payload'],
) {
  const sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        'session_type,session_duration,schedule_type,name,interview_meeting(start_time,end_time)',
      )
      .in('id', req_body.session_ids),
  );

  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,email,timezone,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', req_body.application_id),
  );
  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name,scheduling_settings')
      .eq('user_id', candidateJob.public_jobs.recruiter),
  );
  const recruiter_tz = recruiter_user.scheduling_settings.timeZone.tzCode;

  const cand_tz = 'America/Los_Angeles';

  const meeting_details: MeetingDetailCardType[] = sessions.map((session) => {
    const {
      interview_meeting: { start_time, end_time },
      name,
      schedule_type,
      session_duration,
      session_type,
    } = session;
    return {
      date: dayjsLocal(start_time)
        .tz(cand_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      time: `${dayjsLocal(start_time).tz(cand_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(end_time).tz(cand_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)}`,
      sessionType: name,
      platform: platformRemoveUnderscore(schedule_type),
      duration: durationCalculator(session_duration),
      sessionTypeIcon: sessionTypeIcon(session_type),
      meetingIcon: scheduleTypeIcon(schedule_type),
    };
  });

  const { candidates, public_jobs } = candidateJob;

  const comp_email_temp = await fetchCompEmailTemp(
    candidateJob.candidates.recruiter_id,
    'interviewCancel_email_applicant',
  );

  const comp_email_placeholder: EmailTemplateAPi<'interviewCancel_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: candidates.first_name,
      companyName: public_jobs.company,
      jobRole: public_jobs.job_title,
      recruiterName: getFullName(
        recruiter_user.first_name,
        recruiter_user.last_name,
      ),
      candidateLastName: candidates.last_name,
      candidateName: getFullName(candidates.first_name, candidates.last_name),
      recruiterFirstName: recruiter_user.first_name,
      recruiterLastName: recruiter_user.last_name,
      recruiterTimeZone: recruiter_tz,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );

  const react_email_placeholders: EmailTemplateAPi<'interviewCancel_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: candidateJob.candidates.recruiter.logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
      meetingDetails: meeting_details,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: candidates.email,
  };
}
