import { SupabaseType } from '@aglint/shared-types';

export const removeSessionFromFilterJson = async ({
  supabase,
  session_id,
}: {
  supabase: SupabaseType;
  session_id: string;
}) => {
  const { data: checkFilterJson, error: errMeetFilterJson } = await supabase
    .from('interview_filter_json')
    .select('*')
    .contains('session_ids', [session_id]);

  if (errMeetFilterJson) throw new Error(errMeetFilterJson.message);

  if (checkFilterJson.length > 0) {
    const updateDbArray = checkFilterJson.map((filterJson) => ({
      ...filterJson,
      session_ids: filterJson.session_ids.filter((id) => id !== session_id),
    }));

    const { error: errFilterJson } = await supabase
      .from('interview_filter_json')
      .upsert(updateDbArray);

    if (errFilterJson) throw new Error(errFilterJson.message);
  }

  return true;
};
