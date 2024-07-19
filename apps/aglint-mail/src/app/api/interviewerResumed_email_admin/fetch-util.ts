import type { EmailTemplateAPi } from '@aglint/shared-types';
import { fillCompEmailTemplate, getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchCompEmailTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';

export async function dbFetch(
  req_body: EmailTemplateAPi<'interviewerResumed_email_admin'>['api_payload'],
) {
  const [interview_module] = supabaseWrap(
    await supabaseAdmin
      .from('interview_module_relation')
      .select(
        'user_id,recruiter_user(first_name,last_name,email,department,interview_location),interview_module(name,recruiter_id,recruiter(logo))',
      )
      .eq('id', req_body.interviewe_module_relation_id),
  );
  const [admin_detail] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_relation')
      .select('created_by')
      .eq('user_id', interview_module.user_id),
  );

  const admin_id = admin_detail.created_by;
  const [admin] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name,email')
      .eq('user_id', admin_id),
  );

  const interviewtype = supabaseWrap(
    await supabaseAdmin
      .from('interview_module_relation')
      .select('interview_module(name),pause_json')
      .eq('user_id', interview_module.user_id),
  );

  const interviewtypes = interviewtype
    .filter((inter) => inter.pause_json === null)
    .map((inter) => `<li><p>${inter.interview_module.name}</P></li>`);

  const interviewer = interview_module.recruiter_user;
  const interviewModule = interview_module.interview_module;

  const comp_email_temp = await fetchCompEmailTemp(
    interviewModule.recruiter_id,
    'interviewerResumed_email_admin',
  );

  const comp_email_placeholder: EmailTemplateAPi<'interviewerResumed_email_admin'>['comp_email_placeholders'] =
    {
      adminFirstName: admin.first_name,
      adminLastName: admin.last_name,
      adminName: getFullName(admin.first_name, admin.last_name),
      interviewerDepartment: interviewer.department,
      interviewerEmail: interviewer.email,
      interviewerFirstName: interviewer.first_name,
      interviewerLastName: interviewer.last_name,
      interviewerLocation: interviewer.interview_location,
      interviewerName: getFullName(
        interviewer.first_name,
        interviewer.last_name,
      ),
      interviewTypes: `<ul>${interviewtypes.join('')}</ul>`,
      interviewerPauseLink: `<a href="${process.env.NEXT_PUBLIC_APP_URL}/scheduling/interviewer/${interview_module.user_id}?tab=interviewtypes" target="_blank">here</a>`,
    };
  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );

  const react_email_placeholders: EmailTemplateAPi<'interviewerResumed_email_admin'>['react_email_placeholders'] =
    {
      companyLogo: interviewModule.recruiter.logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: admin.email,
  };
}
