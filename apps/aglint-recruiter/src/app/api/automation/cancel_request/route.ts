import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { cancelReschdule } from '@/src/utils/automation/utils/cancel_request';

type setting = {
  application_id: string;
  request_id: string;
};
export async function POST(req) {
  const setting: setting = await req.json();
  try {
    const supabaseAdmin = createClient();
    await cancelReschdule(setting, supabaseAdmin);

    return NextResponse.json(
      { message: 'cancel requested successfully' },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            //
          }
        },
      },
    },
  );
}
