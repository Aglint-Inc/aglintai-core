import { ScheduleUtils } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { EmailTemplateAPi } from '@aglint/shared-types';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';
import { fillCompEmailTemplate } from '../../../utils/apiUtils/fillCompEmailTemplate';

interface FilterJson {
  start_date: string;
  end_date: string;
  user_tz: string;
}
export async function fetchUtil(
  req_body: EmailTemplateAPi<'agent_email_candidate'>['api_payload'],
) {
  const [filterJson] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        'filter_json,interview_schedule(id,applications(public_jobs(job_title,company),candidates(first_name,email,recruiter_id,recruiter(logo,id))))',
      )
      .eq('id', req_body.filter_id),
  );

  const { end_date, start_date, user_tz } =
    filterJson.filter_json as unknown as FilterJson;
  const {
    interview_schedule: {
      applications: {
        candidates: {
          email: cand_email,
          recruiter_id,
          first_name,
          recruiter: { logo },
        },
        public_jobs: { company, job_title },
      },
    },
  } = filterJson;

  const comp_email_temp = await fetchCompEmailTemp(
    recruiter_id,
    'agent_email_candidate',
  );

  const scheduleLink = `${process.env.NEXT_PUBLIC_APP_URL}/scheduling/invite/${filterJson.interview_schedule.id}?filter_id=${req_body.filter_id}`;

  const comp_email_placeholder: EmailTemplateAPi<'agent_email_candidate'>['comp_email_placeholders'] =
    {
      '{{ candidateFirstName }}': first_name,
      '{{ companyName }}': company,
      '{{ jobRole }}': job_title,
      '{{ startDate }}': ScheduleUtils.convertDateFormatToDayjs(
        start_date,
        user_tz,
      ).format('MMM DD, YYYY'),
      '{{ endDate }}': ScheduleUtils.convertDateFormatToDayjs(
        end_date,
        user_tz,
      ).format('MMM DD, YYYY'),
      '{{ companyTimeZone }}': '',
      '{{ selfScheduleLink }}': `<a href="${scheduleLink}">here</a>`,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
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

  // return body;
}

// http://localhost:3100/api/init-email-agent

// {
//   "filter_id":"71b8859d-b6c6-425e-8b1a-e97ae8bb9498",
//   "meeting_id":"6c42550f-5d59-4179-aa3a-0c0ae060db88"
// }
