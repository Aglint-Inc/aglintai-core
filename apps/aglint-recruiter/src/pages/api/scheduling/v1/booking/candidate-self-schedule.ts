/* eslint-disable security/detect-object-injection */
import {
  PlanCombinationRespType,
  SessionCombinationRespType,
} from '@aglint/shared-types';
import { ScheduleUtils } from '@aglint/shared-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { scheduling_options_schema } from '@/src/types/scheduling/schema_find_availability_payload';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';
const slot_time = z.object({
  start_time: z.string(),
  end_time: z.string(),
});
const schema_candidate_direct_booking = z.object({
  cand_tz: z.string(),
  filter_id: z.string(),
  task_id: z.string().optional(),
  //   candidate_email: z.string(),
  //   candidate_name: z.string(),
  //   candidate_id: z.string(),
  selected_plan: slot_time.array(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const parsed = schema_candidate_direct_booking.parse(req.body);
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
    const plan_comb = cand_schedule.verifyIntSelectedSlots(cand_filtered_plans);
    return res.status(200).json(plan_comb);
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
      .select('*,interview_schedule(recruiter_id)')
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
  parsed_body: z.infer<typeof schema_candidate_direct_booking>,
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
