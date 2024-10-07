import type {
  EmailTemplateAPi,
  TargetApiPayloadType,
} from '@aglint/shared-types';
import {
  DAYJS_FORMATS,
  ScheduleUtils,
  fillCompEmailTemplate,
  getFullName,
  supabaseWrap,
} from '@aglint/shared-utils';
import { fetchCompEmailTemp } from '../../../../utils/apiUtils/fetchCompEmailTemp';
import type { SupabaseClientType } from '../../../../supabase/supabaseAdmin';

export async function fetchUtil(
  supabaseAdmin: SupabaseClientType,
  req_body: TargetApiPayloadType<'agent_email_candidate'>,
) {
  const filterJson = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '*,applications(public_jobs!inner(job_title),candidates!inner(first_name,last_name,email,recruiter_id,recruiter!inner(logo,name,id)))',
      )
      .eq('id', req_body.filter_id)
      .single(),
  );

  const recr = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name, last_name, scheduling_settings')
      .eq('user_id', req_body.recruiter_user_id)
      .single(),
  );
  const recruiter_tz = recr.scheduling_settings.timeZone.tzCode;
  const { end_date, start_date } = filterJson.filter_json;

  const {
    applications: {
      candidates: {
        email: cand_email,
        recruiter_id,
        first_name,
        last_name,
        recruiter: { name: companyName },
      },
      public_jobs: { job_title },
    },
  } = filterJson;

  const comp_email_temp = await fetchCompEmailTemp(
    supabaseAdmin,
    recruiter_id,
    'agent_email_candidate',
  );

  const scheduleLink = `${process.env.NEXT_PUBLIC_CLIENT_APP_URL}/scheduling/invite/${filterJson.application_id}?filter_id=${req_body.filter_id}`;

  const comp_email_placeholder: EmailTemplateAPi<'agent_email_candidate'>['comp_email_placeholders'] =
    {
      candidateFirstName: first_name,
      companyName,
      jobRole: job_title,
      OrganizerTimeZone: recruiter_tz,
      organizerName: getFullName(recr.first_name, recr.last_name),
      candidateLastName: last_name,
      candidateName: getFullName(first_name, last_name),
      organizerFirstName: recr.first_name,
      organizerLastName: recr.last_name,
      dateRange: `${ScheduleUtils.convertDateFormatToDayjs(
        start_date,
        recruiter_tz,
      ).format(
        DAYJS_FORMATS.DATE_FORMAT,
      )} - ${ScheduleUtils.convertDateFormatToDayjs(
        end_date,
        recruiter_tz,
      ).format(DAYJS_FORMATS.DATE_FORMATZ)}`,
      selfScheduleLink: `<a href="${scheduleLink}" target="_blank">here</a>`,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );

  return {
    filled_comp_template,
    recipient_email: cand_email,
  };
}
