import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export async function POST(req) {
  const { user_ids }: { user_ids: string[] } = await req.json();
  try {
    const { error } = await supabaseAdmin
      .from('recruiter_user')
      .update({ status: 'active' })
      .in('user_id', [...user_ids]);

    if (error) throw new Error(error.message);

    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
