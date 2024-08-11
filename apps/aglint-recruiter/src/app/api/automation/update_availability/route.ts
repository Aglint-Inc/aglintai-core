import { NextResponse } from 'next/server';

import { recruiterId, timezone } from '../utils/constants';
import { fetchLatestCandidateAvailability } from '../utils/fetchAvailability';
import { fetchAndFilterAvailabilitySlots } from '../utils/filterSlots';
import { updateCandidateAvailabilitySlots } from '../utils/updateAvailabilitySlots';

export async function POST(req) {
  const { application_id } = await req.json();

  try {
    const availabilityData: Awaited<
      ReturnType<typeof fetchLatestCandidateAvailability>
    > = await fetchLatestCandidateAvailability(application_id);

    if (!availabilityData?.request_id)
      throw new Error('Availability not found');

    const request_id = availabilityData?.request_id;

    if (availabilityData) {
      const { number_of_days, number_of_slots } = availabilityData;

      const filteredSlots = await fetchAndFilterAvailabilitySlots(
        recruiterId,
        timezone,
        availabilityData.id,
        number_of_days,
        number_of_slots,
      );
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
    return NextResponse.json(
      { message: 'error :' + e.message },
      { status: 400 },
    );
  }
}
