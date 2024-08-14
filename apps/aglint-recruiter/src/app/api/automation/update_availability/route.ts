import { NextResponse } from 'next/server';

import { recruiterId, timezone } from '@/src/utils/automation/utils/constants';
import {
  fetchAndFilterAvailabilitySlots,
  fetchLatestCandidateAvailability,
  updateCandidateAvailabilitySlots,
} from '@/src/utils/automation/utils/submit_availability_functions';

export async function POST(req) {
  const { request_id } = await req.json();
  try {
    const availabilityData: Awaited<
      ReturnType<typeof fetchLatestCandidateAvailability>
    > = await fetchLatestCandidateAvailability(request_id);

    if (availabilityData) {
      const { number_of_days, number_of_slots } = availabilityData;

      const filteredSlots = await fetchAndFilterAvailabilitySlots({
        recruiterId,
        candidateTz: timezone,
        availReqId: availabilityData.id,
        numberOfDays: number_of_days,
        numberOfSlots: number_of_slots,
        currRound: 1,
      });
      await updateCandidateAvailabilitySlots(
        availabilityData.application_id,
        filteredSlots,
      );
    }

    return NextResponse.json(
      { message: 'availability updated', request_id },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
