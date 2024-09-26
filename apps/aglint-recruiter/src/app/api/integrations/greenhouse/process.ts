import { type DatabaseTable } from '@aglint/shared-types';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export async function getGreenhouseMeta(recruiter_id: string) {
  const supabaseAdmin = getSupabaseServer();

  const { greenhouse_metadata, greenhouse_key } = (
    await supabaseAdmin
      .from('integrations')
      .select('greenhouse_metadata, greenhouse_key')
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data!;
  return {
    ...greenhouse_metadata,
    key: greenhouse_key,
  };
}
export async function setGreenhouseMeta(
  recruiter_id: string,
  body: DatabaseTable['integrations']['greenhouse_metadata'],
) {
  const supabaseAdmin = getSupabaseServer();

  return (
    await supabaseAdmin
      .from('integrations')
      .update({ greenhouse_metadata: body })
      .eq('recruiter_id', recruiter_id)
      .select('greenhouse_metadata')
      .single()
      .throwOnError()
  ).data!.greenhouse_metadata;
}
