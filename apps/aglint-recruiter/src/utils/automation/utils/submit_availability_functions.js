import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

// getting ava_request_id ------------------------------------------------------
export async function fetchLatestCandidateAvailability(requestId) {
  const { data, error } = await supabaseAdmin
    .from('candidate_request_availability')
    .select('id, number_of_days, number_of_slots,request_id,application_id')
    .eq('request_id', requestId);

  if (error) {
    throw new Error('fetching candidate request availability');
  }

  return data[0];
}

// getting availabile slots ---------------------------------------------------------
function getRandomSlots(slots, count) {
  const AvalaibleSlots = slots.filter(
    (slot) => slot.is_slot_available === true,
  );
  const shuffledSlots = AvalaibleSlots.sort(() => 0.5 - Math.random());
  return shuffledSlots.slice(0, count ? count : 4);
}

export async function fetchAndFilterAvailabilitySlots({
  recruiterId,
  candidateTz,
  availReqId,
  currRound,
  numberOfDays,
  numberOfSlots,
}) {
  try {
    const availabilityUrl = `${process.env.NEXT_PUBLIC_REQUEST_DOMIN}/api/scheduling/v1/cand_req_available_slots`;
    const slotsResponse = await fetch(availabilityUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recruiter_id: recruiterId,
        candidate_tz: candidateTz,
        avail_req_id: availReqId,
        curr_round: currRound,
      }),
    })
      .then((res) => {
        if (res.status != 200) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return res.json();
      })
      .catch((e) => {
        throw new Error(e.message);
      });

    const slots = slotsResponse.slice(0, numberOfDays * 2).map((day) => {
      return { ...day, slots: getRandomSlots(day.slots, numberOfSlots * 2) };
    });
    return slots;
  } catch (e) {
    throw new Error(e.message);
  }
}

// update slots --------------------------------------------------
export async function updateCandidateAvailabilitySlots(
  applicationId,
  filteredSlots,
) {
  const dataReady = [{ round: 1, dates: filteredSlots }].map((item) => ({
    round: item.round,
    dates: item.dates.map((date) => ({
      curr_day: date.curr_interview_day,
      slots: date.slots.map((slot) => ({
        startTime: slot.start_time,
        endTime: slot.end_time,
        isSlotAvailable: slot.is_slot_available,
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
