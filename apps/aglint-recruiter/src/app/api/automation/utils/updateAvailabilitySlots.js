const { supabaseAdmin } = require('@/src/utils/supabase/supabaseAdmin');

export async function updateCandidateAvailabilitySlots(
  applicationId,
  filteredSlots,
) {
  const dataReady = [{ round: 1, dates: filteredSlots }].map((item) => ({
    round: item.round,
    dates: item.dates.map((date) => ({
      curr_day: date.curr_interview_day, // Rename key
      slots: date.slots.map((slot) => ({
        startTime: slot.start_time, // Rename key
        endTime: slot.end_time, // Rename key
        isSlotAvailable: slot.is_slot_available, // Rename key
      })),
    })),
  }));
  const { error } = await supabaseAdmin
    .from('candidate_request_availability')
    .update({ slots: dataReady, visited: true })
    // .update({ slots: filteredSlots, visited: true })
    .eq('application_id', applicationId);

  if (error) {
    console.error('Error updating slots:', error);
  }
}
