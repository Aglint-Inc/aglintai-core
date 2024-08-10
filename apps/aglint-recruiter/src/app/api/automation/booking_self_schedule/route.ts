import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import {
  bookSelfScheudle,
  getSelfSchudleSlots,
} from '../utils/getSelfScheduleSlots';

export async function POST(req) {
  const { request_ids } = await req.json();

  const { error, data: filter_jsons } = await supabaseAdmin
    .from('interview_filter_json')
    .select('id')
    .in('request_id', request_ids);

  if (error) {
    throw new Error('Failed to fetch filter_id');
  }

  try {
    const filter_ids = filter_jsons.map((filter_json) => filter_json.id);

    const promises = filter_ids.map(async (filter_id) => {
      const allSlots = await getSelfSchudleSlots(filter_id);
      const sturcturedSlots = allSlots.map((slot) => slot.slots).flat(1);
      const randomSelectedSlot =
        sturcturedSlots[
          Math.floor(Math.random() * (sturcturedSlots.length - 1 - 0) + 0)
        ];

      await bookSelfScheudle({
        filter_id: filter_id,
        selectedSlots: randomSelectedSlot,
      });
    });

    await Promise.all(promises).catch((e) => {
      throw new Error(e.message);
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
