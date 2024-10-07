import { NextResponse } from 'next/server';

import { requestReschdule } from '@/utils/automation/utils/reschedule_request';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

type setting = {
  application_id: string;
  request_id: string;
};
export async function POST(req: Request) {
  const setting: setting = await req.json();
  const supabaseAdmin = getSupabaseServer();
  try {
    await requestReschdule(setting, supabaseAdmin);

    return NextResponse.json(
      { message: 'reSchedule requested successfully' },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
