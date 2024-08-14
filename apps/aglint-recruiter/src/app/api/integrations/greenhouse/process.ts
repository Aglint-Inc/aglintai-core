import { DB } from '@aglint/shared-types';
import { SupabaseClient } from '@supabase/supabase-js';

export async function getGreenhouseMeta(
  supabase: SupabaseClient<DB>,
  recruiter_id: string,
) {
  return (
    (
      await supabase
        .from('integrations')
        .select('greenhouse_metadata')
        .eq('recruiter_id', recruiter_id)
        .single()
        .throwOnError()
    ).data.greenhouse_metadata || {}
  );
}
export async function setGreenhouseMeta(
  supabase: SupabaseClient<DB>,
  recruiter_id: string,
  body: Record<string, boolean>,
) {
  return (
    (
      await supabase
        .from('integrations')
        .update({ greenhouse_metadata: body })
        .eq('recruiter_id', recruiter_id)
        .select('greenhouse_metadata')
        .single()
        .throwOnError()
    ).data.greenhouse_metadata || {}
  );
}
