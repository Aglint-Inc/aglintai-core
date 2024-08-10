import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export async function fetchLatestCandidateAvailability(applicationIds) {
  const { data, error } = await supabaseAdmin
    .from('candidate_request_availability')
    .select('id, number_of_days, number_of_slots,request_id,application_id')
    .in('application_id', applicationIds)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(
      'Error fetching the latest candidate request availability: ',
      error,
    );
  }

  return data;
}
