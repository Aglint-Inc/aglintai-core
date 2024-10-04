import { type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { NextResponse } from 'next/server';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

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

export async function POST(req: Request) {
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
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: 'An unknown error occurred' },
        { status: 400 },
      );
    }
  }
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Updates candidate details in the DB.
 * @param {string} application_id - Unique identifier for the job application
 * @param {profileDetailsPayload} details - The details to update
 * @throws {Error} - If the candidate is not found
 */
/******  704bb2b9-5107-49c0-a6fb-4d32cbdb1f17  *******/ const updateCandidateDetails =
  async (application_id: string, details: profileDetailsPayload) => {
    const supabaseAdmin = getSupabaseServer();

    const candidate_id = supabaseWrap(
      await supabaseAdmin
        .from('applications')
        .select('candidate_id')
        .eq('id', application_id)
        .single()
        .throwOnError(),
    ).candidate_id;

    if (candidate_id) {
      const { error } = await supabaseAdmin
        .from('candidates')
        .update({ ...details })
        .eq('id', candidate_id)
        .throwOnError();

      if (error) throw new Error(error.message);
    }
  };
