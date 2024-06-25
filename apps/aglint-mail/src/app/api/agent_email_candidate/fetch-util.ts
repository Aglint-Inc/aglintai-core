import {
  DAYJS_FORMATS,
  ScheduleUtils,
  fillCompEmailTemplate,
  getFullName,
} from '@aglint/shared-utils';
import type { EmailTemplateAPi } from '@aglint/shared-types';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'agent_email_candidate'>['api_payload'],
) {
  const [filterJson] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        'filter_json,interview_schedule(id,applications(public_jobs(job_title,company),candidates(first_name,last_name,email,recruiter_id,recruiter(logo,id))))',
      )
      .eq('id', req_body.filter_id),
  );

  const [recr] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name, last_name, scheduling_settings')
      .eq('user_id', req_body.recruiter_user_id),
  );
  const recruiter_tz = recr.scheduling_settings.timeZone.tzCode;

  const { end_date, start_date } = filterJson.filter_json;
  const {
    interview_schedule: {
      applications: {
        candidates: {
          email: cand_email,
          recruiter_id,
          first_name,
          last_name,
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
      candidateFirstName: first_name,
      companyName: company,
      jobRole: job_title,
      recruiterTimeZone: recruiter_tz,
      selfScheduleLink: `<a href="${scheduleLink}">here</a>`,
      recruiterName: getFullName(recr.first_name, recr.last_name),
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      recruiterFirstName: recr.first_name,
      recruiterLastName: recr.last_name,
      dateRange: `${ScheduleUtils.convertDateFormatToDayjs(
        start_date,
        recruiter_tz,
      ).format(
        DAYJS_FORMATS.DATE_FORMAT,
      )} - ${ScheduleUtils.convertDateFormatToDayjs(
        end_date,
        recruiter_tz,
      ).format(DAYJS_FORMATS.DATE_FORMATZ)}`,
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
}
