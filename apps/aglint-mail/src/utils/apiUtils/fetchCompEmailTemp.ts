import type { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap, supabaseAdmin } from '../../supabase/supabaseAdmin';

export const fetchCompEmailTemp = async (
  recruiter_id: string,
  mail_type: DatabaseEnums['email_slack_types'],
) => {
  const [template] = supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .select()
      .eq('recruiter_id', recruiter_id)
      .eq('type', mail_type),
  );
  if (!template) throw new Error('template not found');
  return template as DatabaseTable['company_email_template'];
};
