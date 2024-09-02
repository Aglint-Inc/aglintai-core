import { supabaseWrap } from '@aglint/shared-utils';
import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type apiResponsePortalCompany = Awaited<ReturnType<typeof getCompany>>;

export async function POST(req) {
  try {
    const { application_id } = await req.json();

    const messages = await getCompany(application_id);
    return NextResponse.json(messages, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: 'error ' + e.message },
      { status: 400 },
    );
  }
}

const getCompany = async (application_id) => {
  const company = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select('candidates(recruiter(name,logo))')
      .eq('id', application_id)
      .single()
      .throwOnError(),
  );

  return company.candidates.recruiter;
};

// candidates(recruiter(name,logo)
