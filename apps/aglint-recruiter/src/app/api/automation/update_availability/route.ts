import { NextResponse } from 'next/server';

import { recruiterId, timezone } from '../utils/constants';
import { fetchLatestCandidateAvailability } from '../utils/fetchAvailability';
import { fetchAndFilterAvailabilitySlots } from '../utils/filterSlots';
import { updateCandidateAvailabilitySlots } from '../utils/updateAvailabilitySlots';

export async function POST(req) {
  const { application_ids } = await req.json();
  try {
    const availabilityDatas: Awaited<
      ReturnType<typeof fetchLatestCandidateAvailability>
    > = await fetchLatestCandidateAvailability(application_ids);

    const request_ids = availabilityDatas.map((ava) => ava.request_id);

    const promises = availabilityDatas.map(async (availabilityData) => {
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
    });

    await Promise.all(promises).catch((e) => {
      throw new Error(e.message);
    });

    return NextResponse.json(
      { message: 'availability updated', request_ids },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: 'error ' + e.message },
      { status: 400 },
    );
  }
}
