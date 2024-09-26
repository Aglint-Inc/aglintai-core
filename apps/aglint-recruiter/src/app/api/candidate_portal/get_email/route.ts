import { NextResponse } from 'next/server';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export type candidatePortalGetEmailtype = Awaited<ReturnType<typeof getEmail>>;

export async function POST(req) {
  try {
    const { application_id } = await req.json();

    const candidate = await getEmail(application_id);

    return NextResponse.json(candidate, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: 'error ' + e.message },
      { status: 400 },
    );
  }
}

const getEmail = async (application_id: string[]) => {
  const supabaseAdmin = getSupabaseServer();

  const { data } = await supabaseAdmin
    .from('applications')
    .select('id,candidates(email)')
    .eq('id', application_id)
    .single()
    .throwOnError();

  return { email: data.candidates.email, application_id: data.id };
};
