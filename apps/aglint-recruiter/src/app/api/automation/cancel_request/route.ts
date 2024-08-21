import { NextResponse } from 'next/server';

import { cancelReschdule } from '@/src/utils/automation/utils/cancel_request';
import { createAdminClient } from '@/src/utils/supabase/server';

type setting = {
  application_id: string;
  request_id: string;
};
export async function POST(req) {
  const setting: setting = await req.json();
  try {
    const supabaseAdmin = createAdminClient();
    await cancelReschdule(setting, supabaseAdmin);

    return NextResponse.json(
      { message: 'cancel requested successfully' },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
