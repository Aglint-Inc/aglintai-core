import { SupabaseType } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';

export async function fetchUtil({
  recruiter_id,
  mail_type,
  job_id,
  supabaseAdmin,
}: {
  supabaseAdmin: SupabaseType;
  recruiter_id: string;
  mail_type: string;
  job_id: string;
}) {
  const [companyName] = supabaseWrap(
    await supabaseAdmin.from('recruiter').select('name').eq('id', recruiter_id),
  );

  let emailFetchedbody: string;

  if (job_id) {
    const [emailbody] = supabaseWrap(
      await supabaseAdmin
        .from('job_email_template')
        .select('body')
        .eq('job_id', job_id)
        .eq('type', mail_type),
    );
    emailFetchedbody = emailbody.body;
  } else {
    const [emailbody] = supabaseWrap(
      await supabaseAdmin
        .from('company_email_template')
        .select('body')
        .eq('recruiter_id', recruiter_id)
        .eq('type', mail_type),
    );
    emailFetchedbody = emailbody.body;
  }
  return { body: emailFetchedbody, companyName: companyName.name };
}
