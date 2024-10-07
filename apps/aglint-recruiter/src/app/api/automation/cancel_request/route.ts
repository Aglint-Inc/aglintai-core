import { supabaseWrap } from '@aglint/shared-utils';
import { NextResponse } from 'next/server';

import {
  getSupabaseServer,
  type SupabaseClientType,
} from '@/utils/supabase/supabaseAdmin';

type setting = {
  application_id: string;
  request_id: string;
};

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseServer();
  const setting: setting = await req.json();
  try {
    await cancelReschdule(setting, supabaseAdmin);

    return NextResponse.json(
      { message: 'cancel requested successfully' },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

const cancelReschdule = async (setting: any, supabase: SupabaseClientType) => {
  const request_rel = supabaseWrap(
    await supabase
      .from('request_relation')
      .select('session_id')
      .eq('request_id', setting.request_id),
  );

  const payload = {
    application_id: setting.application_id,
    session_ids: request_rel.map((rel) => rel.session_id),
    type: 'declined',
  };

  await fetch(
    `${process.env.NEXT_PUBLIC_HOST_NAME}/api/request/candidate-request`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
  ).catch((e) => {
    throw new Error(e.message);
  });
};
