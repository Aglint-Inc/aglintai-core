import type { EmailTemplateAPi } from '@aglint/shared-types';
import { fillCompEmailTemplate, getFullName } from '@aglint/shared-utils';
import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';
import { fetchSignupTemp } from '../../../utils/apiUtils/fetchCompEmailTemp';

export async function fetchUtil(
  req_body: EmailTemplateAPi<'onSignup_email_admin'>['api_payload'],
) {
  const [organizer] = supabaseWrap(
    await supabaseAdmin
      .from('recruiter_relation')
      .select(
        'recruiter_user(first_name,last_name,scheduling_settings,email),recruiter(logo)',
      )
      .eq('user_id', req_body.recruiter_id),
  );

  const comp_email_temp = await fetchSignupTemp('onSignup_email_admin');

  const comp_email_placeholder: EmailTemplateAPi<'onSignup_email_admin'>['comp_email_placeholders'] =
    {
      organizerName: getFullName(
        organizer.recruiter_user.first_name,
        organizer.recruiter_user.last_name,
      ),
      organizerFirstName: organizer.recruiter_user.first_name,
      organizerLastName: organizer.recruiter_user.last_name,
      OrganizerTimeZone:
        organizer.recruiter_user.scheduling_settings.timeZone.tzCode,
    };
  const filled_comp_template = fillCompEmailTemplate(
    comp_email_placeholder,
    comp_email_temp,
  );
  const react_email_placeholders: EmailTemplateAPi<'onSignup_email_admin'>['react_email_placeholders'] =
    {
      companyLogo: organizer.recruiter.logo,
      emailBody: filled_comp_template.body,
      subject: filled_comp_template.subject,
    };

  return {
    filled_comp_template,
    react_email_placeholders,
    recipient_email: organizer.recruiter_user.email,
  };
}
