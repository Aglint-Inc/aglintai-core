import type { EmailTemplateAPi } from '@aglint/shared-types';
import { fillCompEmailTemplate, getFullName } from '@aglint/shared-utils';
import { supabaseAdmin } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';

export async function dbUtil(
  req_body: EmailTemplateAPi<'selfScheduleReminder_email_applicant'>['api_payload'],
) {
  const { data: filterJson } = await supabaseAdmin
    .from('interview_filter_json')
    .select(
      'filter_json,interview_schedule(id,applications(public_jobs(job_title,recruiter_id,company,recruiter),candidates(first_name,last_name,email,recruiter(logo))))',
    )
    .eq('id', req_body.filter_json_id)
    .single()
    .throwOnError();

  const {
    interview_schedule: {
      applications: {
        candidates: { email: cand_email, first_name, last_name, recruiter },
        public_jobs: { company, recruiter_id, job_title },
      },
    },
  } = filterJson;

  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'selfScheduleReminder_email_applicant',
  );
  const scheduleLink = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/invite/${filterJson.interview_schedule.id}?filter_id=${req_body.filter_json_id}`;
  const comp_email_placeholder: EmailTemplateAPi<'selfScheduleReminder_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      companyName: company,
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      jobRole: job_title,
      selfScheduleLink: `<a href="${scheduleLink}">here</a>`,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );

  const react_email_placeholders: EmailTemplateAPi<'selfScheduleReminder_email_applicant'>['react_email_placeholders'] =
    {
      emailBody: filled_comp_template.body,
      companyLogo: recruiter.logo,
      subject: filled_comp_template.subject,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: cand_email,
  };
}
