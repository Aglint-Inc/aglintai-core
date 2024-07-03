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
  req_body: EmailTemplateAPi<'InterviewCancelReq_email_recruiter'>['api_payload'],
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
        'candidates(first_name,last_name,recruiter_id,recruiter(logo)),public_jobs(job_title,company)',
      )
      .eq('id', req_body.application_id),
  );

  const [session_cancel] = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_cancel')
      .select('reason,other_details')
      .eq('id', req_body.interview_cancel_id),
  );

  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('email,first_name,last_name,scheduling_settings')
      .eq('user_id', candidateJob.public_jobs.recruiter),
  );

  const int_tz = recruiter_user.scheduling_settings.timeZone.tzCode;
  const { candidates, public_jobs } = candidateJob;

  const meeting_details: MeetingDetailCardType[] = sessions.map((session) => {
    const {
      interview_meeting: { start_time, end_time },
      name,
      schedule_type,
      session_duration,
      session_type,
    } = session;
    return {
      date: dayjsLocal(start_time).tz(int_tz).format(DAYJS_FORMATS.DATE_FORMAT),
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
    'InterviewCancelReq_email_recruiter',
  );

  const comp_email_placeholder: EmailTemplateAPi<'InterviewCancelReq_email_recruiter'>['comp_email_placeholders'] =
    {
      additionalRescheduleNotes: session_cancel.other_details.note,
      cancelReason: session_cancel.reason,
      recruiterName: getFullName(
        recruiter_user.first_name,
        recruiter_user.last_name,
      ),
      jobRole: candidateJob.public_jobs.job_title,
      candidateFirstName: candidates.first_name,
      candidateLastName: candidates.last_name,
      candidateName: getFullName(candidates.first_name, candidates.last_name),
      companyName: public_jobs.company,
      recruiterFirstName: recruiter_user.first_name,
      recruiterLastName: recruiter_user.last_name,
      recruiterTimeZone: int_tz,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );

  const react_email_placeholders: EmailTemplateAPi<'InterviewCancelReq_email_recruiter'>['react_email_placeholders'] =
    {
      companyLogo: candidateJob.candidates.recruiter.logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
      meetingDetails: meeting_details,
      meetingLink: `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/application/${req_body.application_id}`,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: recruiter_user.email,
  };
}
