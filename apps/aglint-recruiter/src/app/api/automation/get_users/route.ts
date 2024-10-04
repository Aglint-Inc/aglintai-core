import { supabaseWrap } from '@aglint/shared-utils';
import { NextResponse } from 'next/server';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const supabaseAdmin = getSupabaseServer();
  const { recruiter_id }: { recruiter_id: string } = await req.json();
  try {
    const relns = supabaseWrap(
      await supabaseAdmin
        .from('recruiter_relation')
        .select(
          'recruiter_user!public_recruiter_relation_user_id_fkey(user_id,email,status)',
        )
        .eq('recruiter_id', recruiter_id),
    );

    return NextResponse.json(
      { users: relns.map((d) => d.recruiter_user) },
      { status: 200 },
    );
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
