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
  req_body: EmailTemplateAPi<'interReschedReq_email_recruiter'>['api_payload'],
) {
  const int_sessions = supabaseWrap(
    await supabaseAdmin
      .from('interview_session')
      .select(
        '*,interview_meeting(*, recruiter_user(first_name,last_name,email,scheduling_settings))',
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
      .select('other_details,reason')
      .eq('id', req_body.interview_cancel_id),
  );

  const { candidates } = candidateJob;
  const comp_email_temp = await fetchCompEmailTemp(
    candidateJob.candidates.recruiter_id,
    'interReschedReq_email_recruiter',
  );
  const meeting_organizer = int_sessions[0].interview_meeting.recruiter_user;

  const int_tz = meeting_organizer.scheduling_settings.timeZone.tzCode;

  const meeting_details: MeetingDetailCardType[] = int_sessions.map(
    (session) => {
      const {
        interview_meeting: { start_time, end_time },
        name,
        schedule_type,
        session_duration,
        session_type,
      } = session;
      return {
        date: dayjsLocal(start_time).format(DAYJS_FORMATS.DATE_FORMAT),
        time: `${dayjsLocal(start_time).tz(int_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(end_time).tz(int_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)}`,
        sessionType: name,
        platform: platformRemoveUnderscore(schedule_type),
        duration: durationCalculator(session_duration),
        sessionTypeIcon: sessionTypeIcon(session_type),
        meetingIcon: scheduleTypeIcon(schedule_type),
      };
    },
  );

  const req_start_date = session_cancel.other_details.dateRange.start;
  const req_end_date = session_cancel.other_details.dateRange.start;
  const comp_email_placeholder: EmailTemplateAPi<'interReschedReq_email_recruiter'>['comp_email_placeholders'] =
    {
      additionalRescheduleNotes: session_cancel.other_details.note,
      candidateFirstName: candidates.first_name,
      recruiterName: getFullName(
        meeting_organizer.first_name,
        meeting_organizer.last_name,
      ),
      jobRole: candidateJob.public_jobs.job_title,
      companyName: candidateJob.public_jobs.company,
      startDate: dayjsLocal(req_start_date)
        .tz(int_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      endDate: dayjsLocal(req_end_date)
        .tz(int_tz)
        .format(DAYJS_FORMATS.DATE_FORMATZ),
      candidateLastName: candidates.last_name,
      candidateName: getFullName(candidates.first_name, candidates.last_name),
      recruiterFirstName: meeting_organizer.first_name,
      recruiterLastName: meeting_organizer.last_name,
      recruiterTimeZone: int_tz,
      rescheduleReason: session_cancel.reason,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );

  const candidateLink = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/application/${req_body.application_id}`;
  const react_email_placeholders: EmailTemplateAPi<'interReschedReq_email_recruiter'>['react_email_placeholders'] =
    {
      companyLogo: candidateJob.candidates.recruiter.logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
      meetingDetails: meeting_details,
      resheduleLink: candidateLink,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: meeting_organizer.email,
  };
}
