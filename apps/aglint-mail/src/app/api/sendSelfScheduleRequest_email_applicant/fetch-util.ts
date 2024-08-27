import type { EmailTemplateAPi } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';

export async function dbUtil(
  req_body: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['api_payload'],
) {
  const fetchCandDetailsFromSchedule = async () => {
    const [filterJson] = supabaseWrap(
      await supabaseAdmin
        .from('interview_filter_json')
        .select(
          'applications(id,public_jobs(job_title,recruiter_id),candidates(first_name,last_name,email,recruiter(logo,name)))',
        )
        .eq('id', req_body.filter_json_id),
    );

    return filterJson;
  };
  const fetchCandDetailsFromApplication = async () => {
    const [filterJson] = supabaseWrap(
      await supabaseAdmin
        .from('applications')
        .select(
          'id,public_jobs(job_title,recruiter_id),candidates(first_name,last_name,email,recruiter(logo,name))',
        )
        .eq('id', req_body.application_id),
    );
    return {
      id: '',
      applications: { ...filterJson },
    };
  };

  const fetchOrganzierDetails = async () => {
    const [organizer] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select('first_name,last_name')
        .eq('user_id', req_body.organizer_id),
    );
    return organizer;
  };

  let filterJson: Awaited<ReturnType<typeof fetchCandDetailsFromSchedule>>;
  const organizer = await fetchOrganzierDetails();

  if (req_body.filter_json_id) {
    filterJson = await fetchCandDetailsFromSchedule();
  } else {
    filterJson = await fetchCandDetailsFromApplication();
  }
  const {
    applications: {
      candidates: { email: cand_email, first_name, recruiter, last_name },
      public_jobs: { recruiter_id, job_title },
    },
  } = filterJson;

  let scheduleLink = '';
  if (filterJson.applications.id && req_body.filter_json_id) {
    scheduleLink = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/invite/${filterJson.applications.id}?filter_id=${req_body.filter_json_id}`;
  }
  const comp_email_placeholder: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      companyName: recruiter.name,
      jobRole: job_title,
      organizerName: getFullName(organizer.first_name, organizer.last_name),
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      organizerFirstName: organizer.first_name,
      organizerLastName: organizer.last_name,
      OrganizerTimeZone: '',
    };

  const react_email_placeholders: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: recruiter.logo,
      selfScheduleLink: scheduleLink,
    };

  return {
    company_id: recruiter_id,
    comp_email_placeholder,
    react_email_placeholders,
    recipient_email: cand_email,
  };
}
