import type { DatabaseEnums } from '@aglint/shared-types';
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
  return template;
};

export const fetchJobEmailTemp = async (
  job_id: string,
  mail_type: DatabaseEnums['email_slack_types'],
) => {
  const [template] = supabaseWrap(
    await supabaseAdmin
      .from('job_email_template')
      .select()
      .eq('job_id', job_id)
      .eq('type', mail_type),
  );
  return template;
};

export const fetchSignupTemp = async (
  mail_type: DatabaseEnums['email_slack_types'],
) => {
  const [template] = supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .select()
      .eq('type', mail_type),
  );
  return template;
};
