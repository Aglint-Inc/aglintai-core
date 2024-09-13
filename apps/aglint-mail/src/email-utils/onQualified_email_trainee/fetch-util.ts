import type { EmailTemplateAPi, SupabaseType } from '@aglint/shared-types';
import { getFullName, supabaseWrap } from '@aglint/shared-utils';
import { FetchUtilType } from '../../types/emailfetchUtil';

export const fetchUtil: FetchUtilType<'onQualified_email_trainee'> = async (
  supabaseAdmin,
  req_body,
) => {
  const [data] = supabaseWrap(
    await supabaseAdmin
      .from('interview_module_relation')
      .select(
        'recruiter_user(first_name,last_name,email),interview_module(name,recruiter_id,recruiter(logo,name,id))',
      )
      .eq('id', req_body.interview_module_relation_id),
  );

  const [approver] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name,email')
      .eq('user_id', req_body.approver_id),
  );

  const { interview_module, recruiter_user: trainee } = data;
  const company = data.interview_module.recruiter;

  const comp_email_placeholder: EmailTemplateAPi<'onQualified_email_trainee'>['comp_email_placeholders'] =
    {
      approverFirstName: approver.first_name,
      approverLastName: approver.last_name,
      approverName: getFullName(approver.first_name, approver.last_name),
      interviewType: interview_module.name,
      traineeFirstName: trainee.first_name,
      traineeLastName: trainee.last_name,
      traineeName: getFullName(trainee.first_name, trainee.last_name),
      companyName: company.name,
    };

  const react_email_placeholders: EmailTemplateAPi<'onQualified_email_trainee'>['react_email_placeholders'] =
    {
      companyLogo: company.logo,
    };

  return {
    mail_data: {
      comp_email_placeholder,
      company_id: company.id,
      react_email_placeholders,
      recipient_email: trainee.email,
    },
  };
};
