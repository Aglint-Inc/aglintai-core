import { supabaseAdmin, supabaseWrap } from '../../../supabase/supabaseAdmin';

export async function fetchUtil({
  recruiter_id,
  mail_type,
}: {
  recruiter_id: string;
  mail_type: string;
}) {
  const [companyName] = supabaseWrap(
    await supabaseAdmin.from('recruiter').select('name').eq('id', recruiter_id),
  );
  const [emailbody] = supabaseWrap(
    await supabaseAdmin
      .from('company_email_template')
      .select('body')
      .eq('recruiter_id', recruiter_id)
      .eq('type', mail_type),
  );

  return { body: emailbody.body, companyName: companyName.name };
}
