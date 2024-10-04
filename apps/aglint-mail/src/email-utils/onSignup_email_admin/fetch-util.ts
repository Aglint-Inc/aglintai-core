import type { EmailTemplateAPi } from '@aglint/shared-types';
import { getFullName, supabaseWrap } from '@aglint/shared-utils';
import type { FetchUtilType } from '../../types/emailfetchUtil';

export const fetchUtil: FetchUtilType<'onSignup_email_admin'> = async (
  supabaseAdmin,
  req_body,
) => {
  const [recruiterUser] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_user')
      .select('first_name,last_name,scheduling_settings,email')
      .eq('user_id', req_body.recruiter_user_id),
  );

  const [recruiter] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter')
      .select('logo,id')
      .eq('id', req_body.recruiter_id),
  );

  const comp_email_placeholder: EmailTemplateAPi<'onSignup_email_admin'>['comp_email_placeholders'] =
    {
      organizerName: getFullName(
        recruiterUser.first_name,
        recruiterUser.last_name,
      ),
      organizerFirstName: recruiterUser.first_name,
      organizerLastName: recruiterUser.last_name,
      OrganizerTimeZone: recruiterUser.scheduling_settings.timeZone.tzCode,
    };

  const react_email_placeholders: EmailTemplateAPi<'onSignup_email_admin'>['react_email_placeholders'] =
    {
      companyLogo: recruiter.logo,
    };

  return {
    mail_data: {
      company_id: recruiter.id,
      comp_email_placeholder,
      react_email_placeholders,
      recipient_email: recruiterUser.email,
    },
  };
};
