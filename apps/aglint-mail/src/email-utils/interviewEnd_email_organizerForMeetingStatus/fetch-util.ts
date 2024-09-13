import type { EmailTemplateAPi } from '@aglint/shared-types';
import { DAYJS_FORMATS, getFullName, supabaseWrap } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { FetchUtilType } from '../../types/emailfetchUtil';

export const fetchUtil: FetchUtilType<
  'interviewEnd_email_organizerForMeetingStatus'
> = async (supabaseAdmin, req_body) => {
  const [data] = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select(
        '*,recruiter_id,recruiter_user(first_name,last_name,email,scheduling_settings),applications(candidates(first_name,last_name,recruiter_id,recruiter(name,logo)),public_jobs(job_title))',
      )
      .eq('session_id', req_body.session_id),
  );

  const organizer = data.recruiter_user;
  const candidate = data.applications.candidates;
  const company = data.applications.candidates.recruiter;
  const job = data.applications.public_jobs.job_title;
  const org_tz = organizer.scheduling_settings.timeZone.tzCode;
  const start_time = data.start_time;
  const meeting_id = data.id;
  const meetingStatusUpdateLink = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/view?meeting_id=${meeting_id}&tab=candidate_details`;

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

  const react_email_placeholders: EmailTemplateAPi<'interviewEnd_email_organizerForMeetingStatus'>['react_email_placeholders'] =
    {
      companyLogo: company.logo,
      meetingStatusUpdateLink,
    };

  return {
    mail_data: {
      company_id: candidate.recruiter_id,
      comp_email_placeholder,
      react_email_placeholders,
      recipient_email: organizer.email,
    },
  };
};
