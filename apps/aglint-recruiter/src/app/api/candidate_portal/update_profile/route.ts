import { type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export type profileDetailsPayload = Pick<
  DatabaseTable['candidates'],
  | 'first_name'
  | 'last_name'
  | 'email'
  | 'timezone'
  | 'phone'
  | 'linkedin'
  | 'avatar'
>;

export async function POST(req) {
  try {
    const {
      application_id,
      details,
    }: { application_id: string; details: profileDetailsPayload } =
      await req.json();

    if (!details) {
      throw new Error('Please provide the requried fields');
    }
    await updateCandidateDetails(application_id, details);
    return NextResponse.json(
      {
        message: 'Profile update successfully',
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(e.message, { status: 400 });
  }
}

const updateCandidateDetails = async (
  application_id: string,
  details: profileDetailsPayload,
) => {
  const candidate_id = supabaseWrap(
    await supabaseAdmin
      .from('applications')
      .select('candidate_id')
      .eq('id', application_id)
      .single()
      .throwOnError(),
  ).candidate_id;

  const { error } = await supabaseAdmin
    .from('candidates')
    .update({ ...details })
    .eq('id', candidate_id)
    .throwOnError();

  if (error) throw new Error(error.message);
};
