import { NextResponse } from 'next/server';

import {
  getAvaRequestId,
  sendReminder,
} from '../utils/reminder _availability__functions';

export async function POST(req) {
  const { request_id, target_api } = await req.json();
  const request_availability_id = await getAvaRequestId(request_id);
  await sendReminder(request_availability_id, target_api);
  try {
    return NextResponse.json(
      { message: 'Availability reminder sent successfully' },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
