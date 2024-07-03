import type { EmailTemplateAPi } from '@aglint/shared-types';
import { fillCompEmailTemplate, getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';

export async function dbUtil(
  req_body: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['api_payload'],
) {
  const [filterJson] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        'filter_json,interview_schedule(id,applications(public_jobs(job_title,recruiter_id,company),candidates(first_name,last_name,email,recruiter(logo))))',
      )
      .eq('id', req_body.filter_json_id),
  );

  const {
    interview_schedule: {
      applications: {
        candidates: { email: cand_email, first_name, recruiter, last_name },
        public_jobs: { company, recruiter_id, job_title },
      },
    },
  } = filterJson;

  const [organizer] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name')
      .eq('user_id', req_body.organizer_id),
  );
  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'sendSelfScheduleRequest_email_applicant',
  );
  const task_id = req_body.task_id;
  const scheduleLink = task_id
    ? `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/invite/${filterJson.interview_schedule.id}?filter_id=${req_body.filter_json_id}&task_id=${task_id}`
    : `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/invite/${filterJson.interview_schedule.id}?filter_id=${req_body.filter_json_id}`;
  const comp_email_placeholder: EmailTemplateAPi<'sendSelfScheduleRequest_email_applicant'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      companyName: company,
      jobRole: job_title,
      selfScheduleLink: `<a href="${scheduleLink}">here</a>`,
      OrganizerName: getFullName(organizer.first_name, organizer.last_name),
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      OrganizerFirstName: organizer.first_name,
      OrganizerLastName: organizer.last_name,
      OrganizerTimeZone: '',
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
