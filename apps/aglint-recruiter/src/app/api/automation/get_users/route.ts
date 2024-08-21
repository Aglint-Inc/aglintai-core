import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export async function POST(req) {
  const { recruiter_id }: { recruiter_id: string } = await req.json();
  try {
    const { data, error } = await supabaseAdmin
      .from('recruiter_relation')
      .select('recruiter_user!public_recruiter_relation_user_id_fkey(email)')
      .eq('recruiter_id', recruiter_id);

    if (error) throw new Error(error.message);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      { users: data.map((d) => d.recruiter_user) },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
