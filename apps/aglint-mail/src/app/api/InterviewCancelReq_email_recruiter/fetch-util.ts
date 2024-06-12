import type {
  EmailTemplateAPi,
  MeetingDetailCardType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/userTzDayjs';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import {
  platformRemoveUnderscore,
  durationCalculator,
  sessionTypeIcon,
  scheduleTypeIcon,
} from '../../../utils/email/common/functions';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';
import { getFullName } from '@aglint/shared-utils';

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
        'candidates(first_name,recruiter_id,recruiter(logo)),public_jobs(job_title,company,recruiter)',
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
      date: dayjsLocal(start_time).tz(int_tz).format('ddd MMMM DD, YYYY'),
      time: `${dayjsLocal(start_time).tz(int_tz).format('hh:mm A')} - ${dayjsLocal(end_time).tz(int_tz).format('hh:mm A')}`,
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
      '{{ additionalRescheduleNotes }}': session_cancel.other_details.note,
      '{{ cancelReason }}': session_cancel.reason,
      '{{ recruiterName }}': recruiter_user.first_name,
      '{{ candidateFirstName }}': candidates.first_name,
      '{{ companyName }}': public_jobs.company,
      '{{ recruiterFullName }}': getFullName(
        recruiter_user.first_name,
        recruiter_user.last_name,
      ),
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
