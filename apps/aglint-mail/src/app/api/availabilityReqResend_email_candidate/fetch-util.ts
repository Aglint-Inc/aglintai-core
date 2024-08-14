import type { EmailTemplateAPi } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';

export async function dbUtil(
  req_body: EmailTemplateAPi<'availabilityReqResend_email_candidate'>['api_payload'],
) {
  const [avail_req_data] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select(
        'id,applications(id, candidates(first_name,last_name,email,recruiter_id,recruiter(logo,name)),public_jobs( job_title))',
      )
      .eq('id', req_body.avail_req_id),
  );

  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name,scheduling_settings')
      .eq('user_id', req_body.recruiter_user_id),
  );
  const recruiter_tz = recruiter_user.scheduling_settings.timeZone.tzCode;
  const {
    candidates: {
      email: cand_email,
      recruiter_id,
      first_name,
      last_name,
      recruiter: { logo, name: companyName },
    },
    public_jobs: { job_title },
  } = avail_req_data.applications;

  const candidate_link = req_body.avail_req_id
    ? `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/request-availability/${req_body.avail_req_id}`
    : '';

  const comp_email_placeholder: EmailTemplateAPi<'availabilityReqResend_email_candidate'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      companyName: companyName,
      jobRole: job_title,
      organizerFirstName: recruiter_user.first_name,
      organizerLastName: recruiter_user.last_name,
      organizerName: getFullName(
        recruiter_user.first_name,
        recruiter_user.last_name,
      ),
      OrganizerTimeZone: recruiter_tz,
    };

  const react_email_placeholders: EmailTemplateAPi<'availabilityReqResend_email_candidate'>['react_email_placeholders'] =
    {
      companyLogo: logo,
      availabilityReqLink: candidate_link,
    };

  return {
    company_id: recruiter_id,
    comp_email_placeholder,
    react_email_placeholders,
    recipient_email: cand_email,
  };
}
