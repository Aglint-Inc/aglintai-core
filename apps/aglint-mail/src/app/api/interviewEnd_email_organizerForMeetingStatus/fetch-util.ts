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
      .from('meeting_details')
      .select(
        '*,recruiter_id,recruiter_user(first_name,last_name,email,scheduling_settings),applications(candidates(first_name,last_name,recruiter_id,recruiter(name,logo)),public_jobs(job_title))',
      )
      .eq('session_id', req_body.session_id),
  );

  const recruiter_id = data.recruiter_id;
  const organizer = data.recruiter_user;
  const candidate = data.applications.candidates;
  const company = data.applications.candidates.recruiter;
  const job = data.applications.public_jobs.job_title;
  const org_tz = organizer.scheduling_settings.timeZone.tzCode;
  const start_time = data.start_time;
  const meeting_id = data.id;
  const cancelLink = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`;

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
      date: dayjsLocal(start_time).tz(org_tz).format(DAYJS_FORMATS.DATE_FORMAT),
      time: dayjsLocal(start_time)
        .tz(org_tz)
        .format(DAYJS_FORMATS.END_TIME_FORMAT),
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
      meetingStatusUpdateLink: cancelLink,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: organizer.email,
  };
}
