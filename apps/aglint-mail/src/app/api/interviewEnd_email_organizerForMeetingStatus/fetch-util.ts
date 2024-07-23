import type { EmailTemplateAPi } from '@aglint/shared-types';
import {
  DAYJS_FORMATS,
  fillCompEmailTemplate,
  getFullName,
} from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'interviewEnd_email_organizerForMeetingStatus'>['api_payload'],
) {
  const [data] = supabaseWrap(
    await supabaseAdmin
      .from('interview_meeting')
      .select(
        '*,recruiter_user(first_name,last_name,email,scheduling_settings),interview_schedule(applications(candidates(first_name,last_name,recruiter_id,recruiter(name,logo)),public_jobs(job_title)))',
      )
      .eq('id', req_body.meeting_id),
  );

  const recruiter_id =
    data.interview_schedule.applications.candidates.recruiter_id;
  const organizer = data.recruiter_user;
  const candidate = data.interview_schedule.applications.candidates;
  const meeting_details = data;
  const company = data.interview_schedule.applications.candidates.recruiter;
  const job = data.interview_schedule.applications.public_jobs.job_title;
  const org_tz = organizer.scheduling_settings.timeZone.tzCode;

  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'interviewEnd_email_organizerForMeetingStatus',
  );

  const comp_email_placeholder: EmailTemplateAPi<'interviewEnd_email_organizerForMeetingStatus'>['comp_email_placeholders'] =
    {
      candidateFirstName: candidate.first_name,
      candidateLastName: candidate.last_name,
      candidateName: getFullName(candidate.first_name, candidate.last_name),
      organizerFirstName: organizer.first_name,
      organizerLastName: organizer.last_name,
      organizerName: getFullName(organizer.first_name, organizer.last_name),
      OrganizerTimeZone: org_tz,
      companyName: company.name,
      jobRole: job,
      dateRange: dayjsLocal(meeting_details.start_time)
        .tz(org_tz)
        .format(DAYJS_FORMATS.DATE_FORMAT),
      time: `${dayjsLocal(meeting_details.start_time).tz(org_tz).format(DAYJS_FORMATS.STAR_TIME_FORMAT)} - ${dayjsLocal(meeting_details.end_time).tz(org_tz).format(DAYJS_FORMATS.END_TIME_FORMAT)}`,
      meetingStatusUpdateLink: `<a href="#" target="_blank">here</a>`,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );
  const react_email_placeholders: EmailTemplateAPi<'interviewEnd_email_organizerForMeetingStatus'>['react_email_placeholders'] =
    {
      companyLogo: company.logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: organizer.email,
  };
}
