import { NextResponse } from 'next/server';

import { requestReschdule } from '@/src/utils/automation/utils/reschedule_request';
import { getSupabaseServer } from '@/src/utils/supabase/supabaseAdmin';

type setting = {
  application_id: string;
  request_id: string;
};
export async function POST(req) {
  const setting: setting = await req.json();
  const supabaseAdmin = getSupabaseServer();
  try {
    await requestReschdule(setting, supabaseAdmin);

    return NextResponse.json(
      { message: 'reSchedule requested successfully' },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
