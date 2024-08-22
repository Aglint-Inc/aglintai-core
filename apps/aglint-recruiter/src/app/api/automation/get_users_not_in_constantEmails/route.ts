import { NextResponse } from 'next/server';

import { getSupabaseServer } from '@/src/utils/supabase/supabaseAdmin';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  const supabaseAdmin = getSupabaseServer();
  const {
    recruiter_id,
    constantEmails,
  }: { recruiter_id: string; constantEmails: string[] } = await req.json();
  try {
    const { data: user_ids, error: relation_error } = await supabaseAdmin
      .from('recruiter_relation')
      .select('user_id')
      .eq('recruiter_id', recruiter_id);

    if (relation_error) throw new Error(relation_error.message);

    const userIds: string[] = user_ids.map((user) => user.user_id);

    const { data: users, error } = await supabaseAdmin
      .from('recruiter_user')
      .select('*')
      .in('user_id', userIds)
      .not('email', 'in', `(${constantEmails.join(',')})`);

    // console.log();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      { users: users.filter((user) => !user.schedule_auth) },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
