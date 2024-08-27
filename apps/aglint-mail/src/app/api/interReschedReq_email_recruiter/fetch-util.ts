import type {
  EmailTemplateAPi,
  MeetingDetailCardType,
  SupabaseType,
} from '@aglint/shared-types';
import { DAYJS_FORMATS, getFullName, supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import {
  durationCalculator,
  platformRemoveUnderscore,
  scheduleTypeIcon,
  sessionTypeIcon,
} from '../../../utils/email/common/functions';

export async function fetchUtil(
  supabaseAdmin: SupabaseType,
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
        'candidates(first_name,last_name,recruiter_id,recruiter(logo,name)),public_jobs(job_title)',
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
  const req_end_date = session_cancel.other_details.dateRange.end;
  const comp_email_placeholder: EmailTemplateAPi<'interReschedReq_email_recruiter'>['comp_email_placeholders'] =
    {
      additionalRescheduleNotes: session_cancel.other_details.note,
      candidateFirstName: candidates.first_name,
      organizerName: getFullName(
        meeting_organizer.first_name,
        meeting_organizer.last_name,
      ),
      jobRole: candidateJob.public_jobs.job_title,
      companyName: candidateJob.candidates.recruiter.name,
      startDate: dayjsLocal(req_start_date)
        .tz(int_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      endDate: dayjsLocal(req_end_date)
        .tz(int_tz)
        .format(DAYJS_FORMATS.DATE_FORMATZ),
      candidateLastName: candidates.last_name,
      candidateName: getFullName(candidates.first_name, candidates.last_name),
      organizerFirstName: meeting_organizer.first_name,
      organizerLastName: meeting_organizer.last_name,
      OrganizerTimeZone: int_tz,
      rescheduleReason: session_cancel.reason,
      candidateScheduleLink: `<a href="${process.env.NEXT_PUBLIC_APP_URL}/scheduling/application/${req_body.application_id}" target="_blank">here</a>`,
    };

  const react_email_placeholders: EmailTemplateAPi<'interReschedReq_email_recruiter'>['react_email_placeholders'] =
    {
      companyLogo: candidateJob.candidates.recruiter.logo,
      meetingDetails: meeting_details,
    };

  return {
    company_id: candidateJob.candidates.recruiter_id,
    comp_email_placeholder,
    react_email_placeholders,
    recipient_email: meeting_organizer.email,
  };
}
