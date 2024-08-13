import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

//getting requests
export async function fetchTodoRequests(count = 15) {
  const { data: requests, error } = await supabaseAdmin
    .from('request')
    .select('id, application_id')
    .eq('status', 'to_do')
    .limit(count);

  if (error) {
    throw new Error('Error fetching requests (fetchTodoRequests): ', error);
  }

  return requests;
}

//updating requests
export async function updateRequestStatus(requestId, status = 'in_progress') {
  const { error } = await supabaseAdmin
    .from('request')
    .update({ status })
    .eq('id', requestId);

  if (error) {
    throw new Error('Error fetching requests (fetchTodoRequests): ', error);
  }
}
