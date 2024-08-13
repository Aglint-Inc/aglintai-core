import { NextResponse } from 'next/server';

import {
  getFilterId,
  sendSelfScheduleReminder,
} from '@/src/utils/automation/utils/reminder_selfSchedule_functions';

export async function POST(req) {
  const { request_id, target_api } = await req.json();
  const filter_id = await getFilterId(request_id);
  await sendSelfScheduleReminder(filter_id, target_api);
  try {
    return NextResponse.json(
      { message: 'self schedule reminder sent successfully' },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
