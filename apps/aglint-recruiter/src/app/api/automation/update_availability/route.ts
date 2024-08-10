import { NextResponse } from 'next/server';

import { recruiterId, timezone } from '../utils/constants';
import { fetchLatestCandidateAvailability } from '../utils/fetchAvailability';
import { fetchAndFilterAvailabilitySlots } from '../utils/filterSlots';
import { updateCandidateAvailabilitySlots } from '../utils/updateAvailabilitySlots';

export async function POST(req) {
  const { application_ids } = await req.json();
  try {
    const promises = application_ids.map(async (application_id) => {
      const availabilityData: Awaited<
        ReturnType<typeof fetchLatestCandidateAvailability>
      > = await fetchLatestCandidateAvailability(application_id);

      if (availabilityData) {
        const { number_of_days, number_of_slots } = availabilityData;

        const filteredSlots = await fetchAndFilterAvailabilitySlots(
          recruiterId,
          timezone,
          availabilityData.id,
          number_of_days,
          number_of_slots,
        );
        await updateCandidateAvailabilitySlots(application_id, filteredSlots);
      }
    });

    await Promise.all(promises).catch((e) => {
      throw new Error(e.message);
    });

    return NextResponse.json(
      { message: 'availability updated' },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: 'error ' + e.message },
      { status: 400 },
    );
  }
}
