const { supabaseAdmin } = require('@/src/utils/supabase/supabaseAdmin');

export async function updateCandidateAvailabilitySlots(
  applicationId,
  filteredSlots,
) {
  const { error } = await supabaseAdmin
    .from('candidate_request_availability')
    .update({ slots: filteredSlots, visited: true })
    .eq('application_id', applicationId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Error updating slots:', error);
  }
}
