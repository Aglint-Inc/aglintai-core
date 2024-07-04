import type { EmailTemplateAPi } from '@aglint/shared-types';
import { fillCompEmailTemplate, getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';

export async function dbUtil(
  req_body: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['api_payload'],
) {
  const fetchCandDetailsFromAvailability = async () => {
    const [avail_req] = supabaseWrap(
      await supabaseAdmin
        .from('candidate_request_availability')
        .select(
          'id,applications(id, candidates(first_name,last_name,email,recruiter_id,recruiter(logo)),public_jobs(job_title, company))',
        )
        .eq('id', req_body.avail_req_id),
    );
    return avail_req.applications;
  };
  const fetchCandDetailsFromApplication = async () => {
    const [application] = supabaseWrap(
      await supabaseAdmin
        .from('applications')
        .select(
          'id, candidates(first_name,last_name,email,recruiter_id,recruiter(logo)),public_jobs(job_title, company)',
        )
        .eq('id', req_body.preview_details.application_id),
    );
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
      recruiter: { logo },
    },
    public_jobs: { company, job_title },
  } = avail_req_data;

  const recruiter_tz = meeting_organizer.scheduling_settings.timeZone.tzCode;

  let candidate_link = '';
  if (req_body.avail_req_id) {
    candidate_link = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/request-availability/${req_body.avail_req_id}`;
  } else {
    candidate_link = '#';
  }

  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'sendAvailabilityRequest_email_applicant',
  );

  const comp_email_placeholder: EmailTemplateAPi<'sendAvailabilityRequest_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      companyName: company,
      jobRole: job_title,
      availabilityReqLink: `<a href="${candidate_link}">here</a>`,
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

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );

  const react_email_placeholders: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['react_email_placeholders'] =
    {
      emailBody: filled_comp_template.body,
      companyLogo: logo,
      subject: filled_comp_template.subject,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: cand_email,
  };
}
