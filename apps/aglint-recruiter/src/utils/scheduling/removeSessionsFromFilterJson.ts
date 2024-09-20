import type { SupabaseType } from '@aglint/shared-types';

export const removeSessionsFromFilterJson = async ({
  supabase,
  session_ids,
}: {
  supabase: SupabaseType;
  session_ids: string[];
}) => {
  try {
    await supabase
      .rpc('update_or_delete_filter_json', {
        session_ids_to_remove: session_ids,
      })
      .throwOnError();
    return true;
  } catch (error) {
    // Optionally, handle the error more specifically
    console.error('Failed to update filter JSON:', error);
    return false;
  }
};
