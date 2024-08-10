import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import {
  bookSelfScheudle,
  getSelfSchudleSlots,
} from '../utils/getSelfScheduleSlots';

export async function POST(req) {
  const { request_id } = await req.json();

  const { error, data: filter_json } = await supabaseAdmin
    .from('interview_filter_json')
    .select('id')
    .eq('request_id', request_id)
    .single();

  if (error) {
    throw new Error('Failed to fetch filter_id');
  }

  try {
    const allSlots = await getSelfSchudleSlots(filter_json.id);
    const sturcturedSlots = allSlots.map((slot) => slot.slots).flat(1);
    const randomSelectedSlot =
      sturcturedSlots[
        Math.floor(Math.random() * (sturcturedSlots.length - 1 - 0) + 0)
      ];

    await bookSelfScheudle({
      filter_id: filter_json.id,
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
