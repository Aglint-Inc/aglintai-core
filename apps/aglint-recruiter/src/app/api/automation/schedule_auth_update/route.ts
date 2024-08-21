import { NextResponse } from 'next/server';

import { createAdminClient } from '@/src/utils/supabase/server';

type usersToUpdate = {
  user_id: string;
};

export async function POST(req) {
  const {
    emailAuthData,
    usersToUpdate,
  }: { emailAuthData: any[]; usersToUpdate: usersToUpdate[] } =
    await req.json();
  try {
    const supabaseAdmin = createAdminClient();
    for (const user_id of usersToUpdate) {
      const { error } = await supabaseAdmin
        .from('recruiter_user')
        .update({
          schedule_auth:
            emailAuthData[getRandomValue(0, emailAuthData.length - 1)],
        })
        .eq('user_id', user_id);
      if (error) {
        throw new Error(error.message);
      }
    }

    return NextResponse.json(
      { message: 'successfully update' },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}

function getRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
