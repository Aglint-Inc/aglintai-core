import { SupabaseType } from '@aglint/shared-types';

import dayjs from '../dayjs';

export const createFilterJson = async ({
  sessions_ids,
  application_id,
  organizer_name,
  dateRange,
  supabase,
  rec_user_id,
}: {
  sessions_ids: string[];
  application_id: string;
  organizer_name: string;
  dateRange: {
    start_date: string;
    end_date: string;
  };
  supabase: SupabaseType;
  rec_user_id: string;
}) => {
  const { data: filterJson, error: errorFilterJson } = await supabase
    .from('interview_filter_json')
    .insert({
      filter_json: {
        start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
        end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
        organizer_name: organizer_name,
      },
      session_ids: sessions_ids,
      created_by: rec_user_id,
      application_id,
    })
    .select();

  if (errorFilterJson) throw new Error(errorFilterJson.message);

  return filterJson[0];
};
