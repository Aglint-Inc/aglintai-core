/* eslint-disable security/detect-object-injection */
import { type CandReqAvailableSlots } from '@aglint/shared-types';
import {
  ScheduleUtils,
  scheduling_options_schema,
  schema_candidate_req_availabale_slots,
  supabaseWrap,
} from '@aglint/shared-utils';
import { type NextApiRequest, type NextApiResponse } from 'next';
import * as v from 'valibot';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let parsed_body = v.parse(schema_candidate_req_availabale_slots, {
      ...req.body,
      options: req.body.options || {
        include_conflicting_slots: {},
      },
    });
    const fetched_details = await fetchDetails(parsed_body);
    const cand_schedule = new CandidatesSchedulingV2(
      fetched_details.updated_api_options,
    );
    await cand_schedule.fetchDetails({
      session_ids:
        fetched_details.avail_req_details.request_session_relation.map(
          (s) => s.interview_session.id,
        ),
      start_date_str: fetched_details.avail_req_details.date_range[0],
      end_date_str: fetched_details.avail_req_details.date_range[1],
      company_id: parsed_body.recruiter_id,
      req_user_tz: parsed_body.candidate_tz,
    });

    const curr_round_sugg_slots =
      cand_schedule.candavailabilityWithSuggestion();

    return res.status(200).json(curr_round_sugg_slots);
  } catch (error) {
    console.error(error);
    return res
      .status(error.status ?? 500)
      .json({ name: error.name, message: error.message });
  }
};

export default handler;

const fetchDetails = async (payload: CandReqAvailableSlots) => {
  const [avail_req_details] = supabaseWrap(
    await supabaseAdmin
      .from('candidate_request_availability')
      .select(
        '*,request_session_relation(interview_session(id,break_duration,session_duration))',
      )
      .eq('id', payload.avail_req_id),
  );
  const updated_api_options = v.parse(scheduling_options_schema, {
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
