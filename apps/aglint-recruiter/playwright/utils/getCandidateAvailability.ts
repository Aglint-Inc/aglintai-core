import { supabaseWrap } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

export const getCandidateAvailability = async (request_id: string) => {
  const supabaseAdmin = await getSupabaseServer();
  const request = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select()
      .eq('request_id', request_id)
      .single(),
    false,
  );
  if (!request) {
    throw new Error('No availability requests found');
  }
  return request;
};

export const getBookedAvailability = async () => {
  const supabaseAdmin = await getSupabaseServer();

  const availability = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select(
        '*, request_session_relation!inner(*, interview_session!inner(*, interview_session_cancel(*)))',
      )
      .eq('booking_confirmed', true),
    false,
  );

  const candidateSubmittedRequests = availability.filter((s) =>
    s.request_session_relation.some(
      (r) =>
        !r.interview_session.interview_session_cancel.some(
          (c) =>
            c.type === 'candidate_request_decline' ||
            c.type === 'candidate_request_reschedule',
        ),
    ),
  );

  if (!candidateSubmittedRequests) {
    throw new Error('No availability requests found');
  }

  return candidateSubmittedRequests.map((s) => s.id);
};
