import { DatabaseTable } from '@aglint/shared-types';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export async function getGreenhouseMeta(recruiter_id: string) {
  return (
    await supabaseAdmin
      .from('integrations')
      .select('greenhouse_metadata')
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data.greenhouse_metadata;
}
export async function setGreenhouseMeta(
  recruiter_id: string,
  body: DatabaseTable['integrations']['greenhouse_metadata'],
) {
  return (
    await supabaseAdmin
      .from('integrations')
      .update({ greenhouse_metadata: body })
      .eq('recruiter_id', recruiter_id)
      .select('greenhouse_metadata')
      .single()
      .throwOnError()
  ).data.greenhouse_metadata;
}
