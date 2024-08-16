import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export async function POST(req) {
  const { recruiter_id, constantEmails } = await req.json();
  try {
    const { data: user_ids, error: relation_error } = await supabaseAdmin
      .from('recruiter_relation')
      .select('user_id')
      .eq('recruiter_id', recruiter_id);

    if (relation_error) throw new Error(relation_error.message);

    const userIds: string[] = user_ids.map((user) => user.user_id);

    const conEmail: string[] = constantEmails;
    const { data: users, error } = await supabaseAdmin
      .from('recruiter_user')
      .select('*')
      .in('user_id', userIds)
      .not('email', 'in', `(${conEmail.join(',')})`);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(users, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
