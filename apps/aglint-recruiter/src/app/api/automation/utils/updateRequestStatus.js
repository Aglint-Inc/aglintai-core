import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export async function updateRequestStatus(requestId, status = 'in_progress') {
  const { error } = await supabaseAdmin
    .from('request')
    .update({ status })
    .eq('id', requestId);

  if (error) {
    throw new Error('Error fetching requests (fetchTodoRequests): ', error);
  }
}
