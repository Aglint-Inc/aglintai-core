import { NextResponse } from 'next/server';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseServer();
  const users: { first_name: string; last_name: string; email: string }[] =
    await req.json();

  try {
    const promises = users.map((user) => {
      return supabaseAdmin
        .from('recruiter_user')
        .update({ first_name: user.first_name, last_name: user.last_name })
        .eq('email', user.email);
    });

    const results = await Promise.all(promises);

    results.forEach((result) => {
      if (result.error) {
        throw new Error(result.error.message);
      }
    });

    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
