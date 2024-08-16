import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

type emailsToUpdate = {
  email: string;
  user_id: string;
};

export async function POST(req) {
  const {
    emailAuthData,
    emailsToUpdate,
  }: { emailAuthData: any[]; emailsToUpdate: emailsToUpdate[] } =
    await req.json();
  try {
    for (const user of emailsToUpdate) {
      const { error } = await supabaseAdmin
        .from('recruiter_user')
        .update({
          email_auth:
            emailAuthData[getRandomValue(0, emailAuthData.length - 1)],
        })
        .eq('user_id', user.user_id);
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
