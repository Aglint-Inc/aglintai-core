import { supabaseWrap } from '@aglint/shared-utils';
import { NextResponse } from 'next/server';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export type apiPortalInterviewsResponse = (Awaited<
  ReturnType<typeof getInterviews>
>[number] & { interviewers: Awaited<ReturnType<typeof getInterviewers>> })[];

export async function POST(req: Request) {
  try {
    const { application_id }: { application_id: string } = await req.json();

    const interviews = await getMeetings(application_id);
    return NextResponse.json(interviews, { status: 200 });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json(
        { message: 'error ' + e.message },
        { status: 400 },
      );
    } else return NextResponse.json({ message: 'error ' }, { status: 400 });
  }
}

// uilts ------------------------------------------------------------------

const getMeetings = async (application_id: string) => {
  const interviews = await getInterviews(application_id);

  let interviewWithUsers = [] as apiPortalInterviewsResponse;

  if (interviews.length) {
    interviewWithUsers = await Promise.all(
      interviews.map(async (interview) => {
        const interviewers = await getInterviewers(interview?.session_id || '');
        return {
          ...interview,
          interviewers: interviewers,
        };
      }),
    );
  }
  return interviewWithUsers;
};

const getInterviews = async (application_id: string) => {
  const supabaseAdmin = getSupabaseServer();

  const interviews = supabaseWrap(
    await supabaseAdmin
      .from('meeting_details')
      .select(
        'start_time,end_time,session_name,session_duration,schedule_type,meeting_link,status,session_id',
      )
      .eq('application_id', application_id)
      .throwOnError(),
  );
  return interviews;
};

const getInterviewers = async (session_id: string) => {
  const supabaseAdmin = getSupabaseServer();

  const { data: interviewers } = await supabaseAdmin
    .from('meeting_interviewers')
    .select('first_name,last_name,profile_image,position')
    .eq('session_id', session_id)
    .throwOnError();

  return interviewers;
};
