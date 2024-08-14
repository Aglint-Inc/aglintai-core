/* eslint-disable no-unused-vars */
// import { NextResponse } from 'next/server';

import { NextResponse } from 'next/server';

import {
  bookSelfScheudle,
  getFilterJson,
  getSelfSchudleSlots,
} from '@/src/utils/automation/utils/confirm_selfSchedule';

export async function POST(req) {
  try {
    const { request_id } = await req.json();
    const filter_json_id = await getFilterJson(request_id);
    const allSlots = await getSelfSchudleSlots(filter_json_id);
    const sturcturedSlots = allSlots.map((slot) => slot.slots).flat(1);
    const randomSelectedSlot =
      sturcturedSlots[
        Math.floor(Math.random() * (sturcturedSlots.length - 1 - 0) + 0)
      ];
    await bookSelfScheudle({
      filter_id: filter_json_id,
      selectedSlots: randomSelectedSlot,
    });
    return NextResponse.json(
      {
        message: 'self schedule submitted',
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: 'error ' + e.message },
      { status: 400 },
    );
  }
}
