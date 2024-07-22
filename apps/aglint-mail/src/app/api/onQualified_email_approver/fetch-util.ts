import type { EmailTemplateAPi } from '@aglint/shared-types';
import { fillCompEmailTemplate, getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'onQualified_email_approver'>['api_payload'],
) {
  const [data] = supabaseWrap(
    await supabaseAdmin
      .from('interview_module_relation')
      .select(
        'user_id,recruiter_user(first_name,last_name),interview_module(name,recruiter_id,recruiter(logo,name))',
      )
      .eq('id', req_body.interview_module_relation_id),
  );

  const [approver] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name,email')
      .eq('user_id', req_body.approver_id),
  );

  const [organizer] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name,email,scheduling_settings')
      .eq('user_id', req_body.organizer_id),
  );

  const [shadowCount] = supabaseWrap(
    await supabaseAdmin
      .from('module_relations_view')
      .select('shadow_meeting_count,reverse_shadow_meeting_count')
      .eq('user_id', data.user_id),
  );

  const { interview_module, recruiter_user: trainee } = data;
  const company = data.interview_module.recruiter;

  const comp_email_temp = await fetchCompEmailTemp(
    data.interview_module.recruiter_id,
    'onQualified_email_approver',
  );

  const comp_email_placeholder: EmailTemplateAPi<'onQualified_email_approver'>['comp_email_placeholders'] =
    {
      approverFirstName: approver.first_name,
      approverLastName: approver.last_name,
      approverName: getFullName(approver.first_name, approver.last_name),
      interviewType: interview_module.name,
      traineeFirstName: trainee.first_name,
      traineeLastName: trainee.last_name,
      traineeName: getFullName(trainee.first_name, trainee.last_name),
      companyName: company.name,
      organizerFirstName: organizer.first_name,
      organizerLastName: organizer.last_name,
      organizerName: getFullName(organizer.first_name, organizer.last_name),
      OrganizerTimeZone: organizer.scheduling_settings.timeZone.tzCode,
      reverseShadowCount: String(shadowCount.reverse_shadow_meeting_count),
      shadowCount: String(shadowCount.shadow_meeting_count),
      qualifiedApproverConfirmLink: `<a href="#" target="_blank">here</a>`,
    };

  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );
  const react_email_placeholders: EmailTemplateAPi<'onQualified_email_approver'>['react_email_placeholders'] =
    {
      companyLogo: company.logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: approver.email,
  };
}
