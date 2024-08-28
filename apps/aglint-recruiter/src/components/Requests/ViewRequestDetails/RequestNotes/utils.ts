import dayjs from '@/src/utils/dayjs';
import { supabase } from '@/src/utils/supabase/client';
export async function upsertRequestNotes({
  id,
  note,
  request_id,
  updated_at,
}: {
  id: string;
  note: string;
  request_id: string;
  updated_at: string;
}) {
  const { data, error } = await supabase
    .from('request_note')
    .upsert({ id, note, request_id, updated_at })
    .select()
    .throwOnError();
  if (error) {
    return null;
  } else return data;
}
