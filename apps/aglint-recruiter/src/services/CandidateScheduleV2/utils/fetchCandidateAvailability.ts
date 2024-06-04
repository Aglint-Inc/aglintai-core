import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

export const fetchCandidateAvailability = async (request_id: string) => {
  const [avail_details] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select('slots')
      .eq('id', request_id),
  );
  if (!avail_details) {
    throw new Error('Availabiluty does not exist');
  }

  return avail_details.slots;
};
