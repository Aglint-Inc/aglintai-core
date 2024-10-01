import { CApiError } from '@aglint/shared-utils';

import { type GetAuthParams } from '@/utils/event_book/types';
import { decrypt_string } from '@/utils/integrations/crypt-funcs';
import { getUserCalAuth } from '@/utils/scheduling/getUserCalAuth';
import { type SupabaseClientType } from '@/utils/supabase/supabaseAdmin';

export const fetchRecruiterDBAuthDetails = async (
  recruiter_user_id: string,
  supabaseAdmin: SupabaseClientType,
) => {
  const rec_relns = (
    await supabaseAdmin
      .from('recruiter_relation')
      .select(
        'recruiter!inner(integrations!inner(service_json)),recruiter_user!public_recruiter_relation_user_id_fkey!inner(email,schedule_auth)',
      )
      .eq('user_id', recruiter_user_id)
      .single()
      .throwOnError()
  ).data;
  if (!rec_relns) {
    throw new CApiError('SERVER_ERROR', 'Recruiter user not found');
  }
  const auth_details: GetAuthParams = {
    company_cred: null,
    recruiter: {
      email: rec_relns.recruiter_user.email,
      schedule_auth: rec_relns.recruiter_user.schedule_auth,
      user_id: recruiter_user_id,
    },
  };

  if (rec_relns.recruiter.integrations.service_json) {
    auth_details.company_cred = JSON.parse(
      decrypt_string(rec_relns.recruiter.integrations.service_json),
    );
  }
  const user_auth = await getUserCalAuth({
    recruiter: auth_details.recruiter,
    company_cred: auth_details.company_cred,
  });
  return { user_auth, auth_details };
};
