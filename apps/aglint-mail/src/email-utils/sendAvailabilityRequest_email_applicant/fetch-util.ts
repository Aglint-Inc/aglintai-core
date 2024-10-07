import type { EmailTemplateAPi } from '@aglint/shared-types';
import { getFullName, supabaseWrap } from '@aglint/shared-utils';
import type { FetchUtilType } from '../../types/emailfetchUtil';

export const fetchUtil: FetchUtilType<
  'sendAvailabilityRequest_email_applicant'
> = async (supabaseAdmin, req_body) => {
  let application_id;
  const fetchCandDetailsFromAvailability = async () => {
    const [avail_req] = supabaseWrap(
      await supabaseAdmin
        .from('candidate_request_availability')
        .select(
          'id,application_id,applications(id, candidates(first_name,last_name,email,recruiter_id,recruiter(logo,name)),public_jobs(job_title))',
        )
        .eq('id', req_body.avail_req_id),
    );
    application_id = avail_req.application_id;
    return avail_req.applications;
  };
  const fetchCandDetailsFromApplication = async () => {
    const [application] = supabaseWrap(
      await supabaseAdmin
        .from('applications')
        .select(
          'id, candidates(first_name,last_name,email,recruiter_id,recruiter(logo,name)),public_jobs(job_title)',
        )
        .eq('id', req_body.preview_details.application_id),
    );
    application_id = application.id;
    return application;
  };
  const fetchOrganzierDetails = async () => {
    const [organizer] = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_user')
        .select('first_name,last_name,scheduling_settings')
        .eq('user_id', req_body.organizer_user_id),
    );
    return organizer;
  };
  let avail_req_data: Awaited<
    ReturnType<typeof fetchCandDetailsFromApplication>
  >;
  const meeting_organizer = await fetchOrganzierDetails();
  if (req_body.avail_req_id) {
    avail_req_data = await fetchCandDetailsFromAvailability();
  } else {
    avail_req_data = await fetchCandDetailsFromApplication();
  }

  const {
    candidates: {
      email: cand_email,
      recruiter_id,
      first_name,
      last_name,
      recruiter: { logo, name: companyName },
    },
    public_jobs: { job_title },
  } = avail_req_data;

  const recruiter_tz = meeting_organizer.scheduling_settings.timeZone.tzCode;

  const candidate_link = req_body.avail_req_id
    ? `${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/scheduling/request-availability/${req_body.avail_req_id}`
    : '';

  const comp_email_placeholder: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      companyName,
      jobRole: job_title,
      organizerName: getFullName(
        meeting_organizer.first_name,
        meeting_organizer.last_name,
      ),
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      organizerFirstName: meeting_organizer.first_name,
      organizerLastName: meeting_organizer.last_name,
      OrganizerTimeZone: recruiter_tz,
    };

  const react_email_placeholders: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['react_email_placeholders'] =
    {
      companyLogo: logo,
      availabilityReqLink: candidate_link,
    };

  return {
    mail_data: {
      company_id: recruiter_id,
      application_id,
      comp_email_placeholder,
      react_email_placeholders,
      recipient_email: cand_email,
    },
    candidate_portal_payload: {
      application_id,
      availability_id: req_body.avail_req_id,
      type: 'sendAvailabilityRequest_email_applicant',
    },
  };
};
