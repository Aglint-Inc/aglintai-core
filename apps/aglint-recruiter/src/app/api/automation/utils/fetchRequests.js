import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export async function fetchTodoRequests(limit = 15) {
  const { data: requests, error } = await supabaseAdmin
    .from('request')
    .select('id, application_id')
    .eq('status', 'to_do')
    .limit(limit);

  if (error) {
    throw new Error('Error fetching requests (fetchTodoRequests): ', error);
  }

  return requests;
}
