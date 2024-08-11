import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import {
  bookSelfScheudle,
  getSelfSchudleSlots,
} from '../utils/getSelfScheduleSlots';

export async function POST(req) {
  try {
    const { request_id } = await req.json();

    const {
      error,
      data: [filter_json],
    } = await supabaseAdmin
      .from('interview_filter_json')
      .select('id')
      .eq('request_id', request_id)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Failed to fetch filter_id');
    }

    const filter_id = filter_json?.id;

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
