import { SupabaseType } from '@aglint/shared-types';

export const resetSessionRelations = async ({
  session_ids,
  supabase,
}: {
  session_ids: string[];
  supabase: SupabaseType;
}) => {
  await supabase
    .from('interview_session_relation')
    .update({
      is_confirmed: false,
      accepted_status: 'waiting',
    })
    .in('session_id', session_ids)
    .throwOnError();
  await supabase
    .from('interview_session_cancel')
    .delete()
    .in('session_id', session_ids)
    .throwOnError();
};
