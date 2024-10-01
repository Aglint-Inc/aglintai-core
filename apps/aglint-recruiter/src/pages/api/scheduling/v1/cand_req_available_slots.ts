/* eslint-disable security/detect-object-injection */
import { type CandReqAvailableSlots } from '@aglint/shared-types';
import {
  CApiError,
  ScheduleUtils,
  scheduling_options_schema,
  schema_candidate_req_availabale_slots,
} from '@aglint/shared-utils';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { CandidatesSchedulingV2 } from '@/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

const candidateAvailReqSlots = async (
  parsed_body: z.infer<typeof schema_candidate_req_availabale_slots>,
) => {
  const fetched_details = await fetchDetails(parsed_body);
  const cand_schedule = new CandidatesSchedulingV2(
    fetched_details.updated_api_options,
  );
  await cand_schedule.fetchDetails({
    params: {
      session_ids:
        fetched_details.avail_req_details.request_session_relation.map(
          (s) => s.interview_session.id,
        ),
      start_date_str: fetched_details.avail_req_details.date_range[0],
      end_date_str: fetched_details.avail_req_details.date_range[1],
      company_id: parsed_body.recruiter_id,
      req_user_tz: parsed_body.candidate_tz,
    },
  });

  const curr_round_sugg_slots = cand_schedule.candavailabilityWithSuggestion();

  return curr_round_sugg_slots;
};

const fetchDetails = async (payload: CandReqAvailableSlots) => {
  const supabaseAdmin = getSupabaseServer();

  const avail_req_details = (
    await supabaseAdmin
      .from('candidate_request_availability')
      .select(
        '*,request_session_relation!inner(interview_session!inner(id,break_duration,session_duration))',
      )
      .eq('id', payload.avail_req_id)
      .single()
      .throwOnError()
  ).data;
  if (!avail_req_details) {
    throw new CApiError('SERVER_ERROR', 'No availability request found');
  }
  const updated_api_options = scheduling_options_schema.parse({
    options: {
      include_conflicting_slots: {},
    },
  });
  updated_api_options.include_free_time =
    avail_req_details.availability.free_keywords;
  updated_api_options.include_conflicting_slots.day_off = false;
  updated_api_options.include_conflicting_slots.out_of_working_hrs = false;
  updated_api_options.use_recruiting_blocks =
    avail_req_details.availability.recruiting_block_keywords;

  const session_rounds = ScheduleUtils.getSessionRounds(
    avail_req_details.request_session_relation.map((s, idx) => ({
      ...s,
      session_order: idx,
      break_duration: s.interview_session.break_duration,
      session_duration: s.interview_session.session_duration,
    })),
  );
  const curr_round_duration = session_rounds[0].reduce((sum, curr) => {
    return sum + curr.session_duration;
  }, 0);
  return {
    avail_req_details,
    updated_api_options,
    session_rounds,
    curr_round_duration,
  };
};

export default createPageApiPostRoute(
  schema_candidate_req_availabale_slots,
  candidateAvailReqSlots,
);
