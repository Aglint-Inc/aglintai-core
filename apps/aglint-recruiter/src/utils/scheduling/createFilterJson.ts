import type { SupabaseType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';

export const createFilterJson = async ({
  sessions_ids,
  application_id,
  organizer_name,
  dateRange,
  supabase,
  rec_user_id,
  request_id,
  plans_time_zone,
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
  request_id: string;
  plans_time_zone: string;
}) => {
  const { data: filterJson, error: errorFilterJson } = await supabase
    .from('interview_filter_json')
    .insert({
      filter_json: {
        start_date: dayjsLocal(dateRange.start_date).format('DD/MM/YYYY'),
        end_date: dayjsLocal(dateRange.end_date).format('DD/MM/YYYY'),
        organizer_name: organizer_name,
      },
      session_ids: sessions_ids,
      created_by: rec_user_id,
      application_id,
      request_id,
      plans_time_zone,
    })
    .select();

  if (errorFilterJson) throw new Error(errorFilterJson.message);

  return filterJson[0];
};
