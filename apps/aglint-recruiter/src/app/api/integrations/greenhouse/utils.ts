import { type DB } from '@aglint/shared-types';
import { type SupabaseClient } from '@supabase/supabase-js';

import { decrypt } from '@/src/pages/api/decryptApiKey';

const decryptKey = process.env.ENCRYPTION_KEY!;
if (!decryptKey) {
  throw new Error('ENCRYPTION_KEY is not defined');
}
export async function getGreenhouseKey(
  supabase: SupabaseClient<DB>,
  recruiter_id: string,
) {
  return decrypt(
    (
      await supabase
        .from('integrations')
        .select('greenhouse_key')
        .eq('recruiter_id', recruiter_id)
        .single()
        .throwOnError()
    ).data.greenhouse_key,
    decryptKey,
  );
}
