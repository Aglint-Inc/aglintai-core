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

  const cancelAndReschedule = supabaseWrap(
    await supabaseAdmin
      .from('interview_session_cancel')
      .select('application_id')
      // .eq('type', 'candidate_request_reschedule')
      .eq('type', 'candidate_request_decline'),
    false,
  );

  const application_ids = [
    ...new Set(cancelAndReschedule.map((req) => req.application_id || '')),
  ];

  const availability = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select()
      .eq('booking_confirmed', true)
      .not('application_id', 'in', `(${application_ids.join(',')})`),
    false,
  );

  if (!availability) {
    throw new Error('No availability requests found');
  }
  return availability;
};
