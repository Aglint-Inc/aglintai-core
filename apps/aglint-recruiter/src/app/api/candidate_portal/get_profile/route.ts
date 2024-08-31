import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type candidatePortalProfileType = Awaited<
  ReturnType<typeof getCandidateDetails>
>;

export async function POST(req) {
  try {
    const { application_id } = await req.json();

    const candidate = await getCandidateDetails(application_id);
    return NextResponse.json(candidate, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: 'error ' + e.message },
      { status: 400 },
    );
  }
}

const getCandidateDetails = async (application_id: string[]) => {
  const { data } = await supabaseAdmin
    .from('applications')
    .select(
      'candidate_files(file_url),candidates(first_name,last_name,linkedin,phone,avatar,timezone,email)',
    )
    .eq('id', application_id)
    .single()
    .throwOnError();

  const cand = {
    resume_url: data.candidate_files.file_url,
    ...data.candidates,
  };

  return cand;
};
