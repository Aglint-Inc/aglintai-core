import { supabaseWrap } from '@aglint/shared-utils';
import { NextResponse } from 'next/server';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

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
  const supabaseAdmin = getSupabaseServer();

  const { data } = await supabaseAdmin
    .from('applications')
    .select('candidates(recruiter(name,logo))')
    .eq('id', application_id)
    .single();

  const messages = supabaseWrap(
    await supabaseAdmin
      .from('candidate_portal_message')
      .select('id,message,created_at,message,is_readed,title')
      .eq('application_id', application_id)
      .throwOnError(),
  );

  const messagesWithCompany = messages.map((message) => ({
    ...message,
    company_name: data.candidates.recruiter.name,
    company_logo: data.candidates.recruiter.logo,
  }));
  return messagesWithCompany;
};
