/* eslint-disable security/detect-object-injection */
import {
  PlanCombinationRespType,
  SessionCombinationRespType,
} from '@aglint/shared-types';
import { ScheduleUtils } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import * as v from 'valibot';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { bookInterviewPlan } from '@/src/services/CandidateScheduleV2/utils/bookingUtils/bookInterviewPlan';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { scheduling_options_schema } from '@/src/types/scheduling/schema_find_availability_payload';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
const slot_time = v.object({
  start_time: v.string(),
  end_time: v.string(),
});
const schema_candidate_direct_booking = v.object({
  filter_id: v.pipe(v.string(), v.nonEmpty('required filter_id')),
  cand_tz: v.pipe(v.string(), v.nonEmpty('required cand_tz')),
  task_id: v.nullish(v.string()),
  selected_plan: v.array(slot_time),
});

type CandidateDirectBookingType = v.InferOutput<
  typeof schema_candidate_direct_booking
>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsed = v.parse(schema_candidate_direct_booking, req.body);
    const { filter_json_data } = await fetch_details(parsed.filter_id);

    const interviewer_selected_options =
      filter_json_data.selected_options as PlanCombinationRespType[];

    const cand_filtered_plans: PlanCombinationRespType[] = getCandFilteredSlots(
      interviewer_selected_options,
      parsed,
    );
    const zod_options = scheduling_options_schema.parse({
      include_conflicting_slots: {},
    });
    const cand_schedule = new CandidatesSchedulingV2(
      {
        candidate_tz: parsed.cand_tz,
        start_date_str: filter_json_data.filter_json.start_date,
        end_date_str: filter_json_data.filter_json.end_date,
        recruiter_id: filter_json_data.interview_schedule.recruiter_id,
        session_ids: interviewer_selected_options[0].sessions.map(
          (s) => s.session_id,
        ),
      },
      zod_options,
    );
    await cand_schedule.fetchDetails();
    await cand_schedule.fetchIntsEventsFreeTimeWorkHrs();
    //TODO: verified
    // const verified_plans =
    //   cand_schedule.verifyIntSelectedSlots(cand_filtered_plans);
    // if (verified_plans.length === 0) {
    //   throw new Error('Requested plan does not exist');
    // }
    const details = await bookInterviewPlan(
      cand_schedule,
      cand_filtered_plans[0],
      filter_json_data,
    );
    return res.status(200).json(details);
  } catch (err) {
    console.error(err);
    return res.status(200).send(err.message);
  }
};
export default handler;

const fetch_details = async (filter_id: string) => {
  const [filter_json_data] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select('*,interview_schedule(recruiter_id, id)')
      .eq('id', filter_id),
  );
  if (!filter_json_data) {
    throw new Error('invalid filter id');
  }
  return {
    filter_json_data,
  };
};

const getCandFilteredSlots = (
  interviewer_selected_options: PlanCombinationRespType[],
  parsed_body: CandidateDirectBookingType,
) => {
  const int_rounds_length = ScheduleUtils.getSessionRounds(
    interviewer_selected_options[0].sessions,
  ).length;
  if (parsed_body.selected_plan.length !== int_rounds_length) {
    throw new Error('invalid plan');
  }
  const cand_filtered_plans: PlanCombinationRespType[] = [];

  interviewer_selected_options.forEach((plan) => {
    const session_rounds = ScheduleUtils.getSessionRounds(
      plan.sessions,
    ) as unknown as SessionCombinationRespType[][];
    let is_valid = true;
    for (
      let curr_round_idx = 0;
      curr_round_idx < session_rounds.length;
      ++curr_round_idx
    ) {
      if (
        userTzDayjs(session_rounds[curr_round_idx][0].start_time)
          .tz(parsed_body.cand_tz)
          .format() !== parsed_body.selected_plan[curr_round_idx].start_time &&
        userTzDayjs(
          session_rounds[curr_round_idx][
            session_rounds[curr_round_idx].length - 1
          ].end_time,
        )
          .tz(parsed_body.cand_tz)
          .format() !== parsed_body.selected_plan[curr_round_idx].end_time
      ) {
        is_valid = false;
        break;
      }
    }
    if (is_valid) {
      cand_filtered_plans.push({ ...plan });
    }
  });

  return cand_filtered_plans;
};
