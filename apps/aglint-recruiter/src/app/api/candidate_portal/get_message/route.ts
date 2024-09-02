import { supabaseWrap } from '@aglint/shared-utils';
import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type apiResponsePortalMessage = Awaited<ReturnType<typeof getMessages>>;

export async function POST(req) {
  try {
    const { application_id } = await req.json();

    const messages = await getMessages(application_id);
    return NextResponse.json(messages, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: 'error ' + e.message },
      { status: 400 },
    );
  }
}

const getMessages = async (application_id) => {
  const message = supabaseWrap(
    await supabaseAdmin
      .from('candidate_portal_message')
      .select(
        'id,message,created_at,message,is_readed,title,recruiter_user(first_name,last_name,profile_image)',
      )
      .eq('application_id', application_id)
      .throwOnError(),
  );

  return message;
};
