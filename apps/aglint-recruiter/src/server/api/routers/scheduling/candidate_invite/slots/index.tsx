/* eslint-disable security/detect-object-injection */
import {} from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import {
  convertOptionsToDateRangeSlots,
  verifyRecruiterSelectedSlots,
} from '@/services/CandidateSchedule/utils/bookingUtils/verifyRecruiterSelctedOptions';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const schema = z.object({
  candidate_tz: z.string(),
  filter_json_id: z.string(),
  company_id: z.string(),
});

const query = async ({
  input: { candidate_tz, filter_json_id, company_id },
}: PublicProcedure<typeof schema>) => {
  const supabaseAdmin = getSupabaseServer();
  const filter_json = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select()
      .eq('id', filter_json_id)
      .single(),
  );
  const { verified_slots } = await verifyRecruiterSelectedSlots({
    candidate_tz,
    company_id: company_id,
    selected_options: filter_json.selected_options,
    session_ids: filter_json.session_ids,
  });
  const res = convertOptionsToDateRangeSlots(verified_slots, candidate_tz);
  return res;
};

export const slotsCandidateInvite = publicProcedure.input(schema).query(query);
