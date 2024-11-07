import { supabaseWrap } from '@aglint/shared-utils';
import { getCompanyDetails } from 'playwright/utils/dbfetch';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const getRequestId = async () => {
  const { recruiter_user } = await getCompanyDetails();
  const supabaseAdmin = await getSupabaseServer();
  const scheduleRequests = supabaseWrap(
    await supabaseAdmin
      .from('request')
      .select('*, request_relation!inner(*, interview_session!inner(*))')
      .eq('type', 'schedule_request')
      .eq('status', 'to_do')
      .eq('assigner_id', recruiter_user.user_id),
    false,
  );

  if (scheduleRequests.length === 0) {
    throw new Error('No schedule requests found');
  }
  const randomRequestId =
    scheduleRequests &&
    scheduleRequests[Math.floor(Math.random() * scheduleRequests.length)].id;

  // const randomRequestId = scheduleRequests[0].id;

  return randomRequestId;
};

export const getNoteId = async (request_id: string) => {
  const supabaseAdmin = await getSupabaseServer();
  const note = supabaseWrap(
    await supabaseAdmin
      .from('request_note')
      .select('id,request_id')
      .eq('request_id', request_id)
      .single(),
    false,
  );
  if (!note) {
    throw new Error('No request notes found');
  }
  const randomNoteId = note.id;
  return randomNoteId;
};

export const getApplicationIds = async ({ count = 2 }: { count?: number }) => {
  const { id: recruiter_id } = await getCompanyDetails();
  const supabaseAdmin = await getSupabaseServer();

  const jobs = supabaseWrap(
    await supabaseAdmin
      .from('public_jobs')
      .select(
        '*, applications!inner(*), interview_plan!inner(*, interview_session!inner(*))',
      )
      .eq('recruiter_id', recruiter_id),
    false,
  );

  const randomJobId =
    jobs && (jobs[Math.floor(Math.random() * jobs.length)].id as string);

  const job = jobs.find((job) => job.id === randomJobId);
  const applications = job && job.applications;

  const randomApplicationIds = applications
    ? applications
        .map((application) => application.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, count)
    : [];

  return randomApplicationIds;
};
