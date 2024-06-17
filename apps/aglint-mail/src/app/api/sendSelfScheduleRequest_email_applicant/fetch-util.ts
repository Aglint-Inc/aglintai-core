import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { EmailTemplateAPi } from '@aglint/shared-types';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';
import { getFullName } from '@aglint/shared-utils';

export async function dbUtil(
  req_body: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['api_payload'],
) {
  const [filterJson] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        'filter_json,interview_schedule(id,applications(public_jobs(job_title,recruiter_id,company,recruiter),candidates(first_name,last_name,email,recruiter(logo))))',
      )
      .eq('id', req_body.filter_json_id),
  );

  const {
    interview_schedule: {
      applications: {
        candidates: { email: cand_email, first_name, recruiter, last_name },
        public_jobs: {
          company,
          recruiter_id,
          job_title,
          recruiter: recruiter_user_id,
        },
      },
    },
  } = filterJson;

  const [recruiter_user] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name')
      .eq('user_id', recruiter_user_id),
  );
  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'sendSelfScheduleRequest_email_applicant',
  );
  const scheduleLink = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/invite/${filterJson.interview_schedule.id}?filter_id=${req_body.filter_json_id}`;
  const comp_email_placeholder: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      companyName: company,
      jobRole: job_title,
      selfScheduleLink: `<a href="${scheduleLink}">here</a>`,
      recruiterName: getFullName(
        recruiter_user.first_name,
        recruiter_user.last_name,
      ),
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      recruiterFirstName: recruiter_user.first_name,
      recruiterLastName: recruiter_user.last_name,
      recruiterTimeZone: '',
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );

  const react_email_placeholders: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['react_email_placeholders'] =
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
