import type { DatabaseEnums, EmailTemplateAPi } from '@aglint/shared-types';
import { fillCompEmailTemplate, getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchJobEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import type { MailPayloadType } from '../../../types/app.types';

export const fetchUtil = async (
  req_body: EmailTemplateAPi<'applicantReject_email_applicant'>['api_payload'],
) => {
  const api_target: DatabaseEnums['email_slack_types'] =
    'applicantReject_email_applicant';
  const [candidateJob] = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select(
        'candidates(first_name,last_name,email,recruiter_id,recruiter(logo)),public_jobs(id,job_title,company,recruiter)',
      )
      .eq('id', req_body.application_id),
  );

  const {
    candidates: {
      email: cand_email,
      first_name,
      last_name,
      recruiter: { logo },
    },
    public_jobs: { company, job_title },
  } = candidateJob;
  let mail_payload: MailPayloadType;

  if (req_body.payload) {
    mail_payload = {
      from_name: '',
      ...req_body.payload,
    };
  } else {
    const comp_email_temp = await fetchJobEmailTemp(
      candidateJob.public_jobs.id,
      api_target,
    );
    mail_payload = {
      ...comp_email_temp,
    };
  }

  const comp_email_placeholder: EmailTemplateAPi<'applicantReject_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      companyName: company,
      jobRole: job_title,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    mail_payload,
  );
  const react_email_placeholders: EmailTemplateAPi<'agent_email_candidate'>['react_email_placeholders'] =
    {
      companyLogo: logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: cand_email,
  };
};
