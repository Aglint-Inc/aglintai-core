import { getSupabaseServer } from "@/utils/supabase/supabaseAdmin";

//getting requests
export async function fetchTodoRequests(count = 15, type = 'to_do') {
  const supabaseAdmin = getSupabaseServer();
  const { data: requests, error } = await supabaseAdmin
    .from('request')
    .select('id, application_id')
    .eq('status', 'to_do')
    .eq('type', type)
    .limit(count);

  if (error) {
    throw new Error('Error fetching requests (fetchTodoRequests): ', error);
  }

  return requests;
}

//updating requests
export async function updateRequestStatus(requestIds, status = 'in_progress') {
  const supabaseAdmin = getSupabaseServer();

  const { error } = await supabaseAdmin
    .from('request')
    .update({ status })
    .in('id', requestIds);

  if (error) {
    throw new Error('Error fetching requests (fetchTodoRequests): ', error);
  }
}
