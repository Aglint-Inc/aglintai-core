/* eslint-disable security/detect-object-injection */
import {
  type CandidateDirectBookingType,
  type PlanCombinationRespType,
  type SessionCombinationRespType,
} from '@aglint/shared-types';
import { SchemaCandidateDirectBooking } from '@aglint/shared-types/src/aglintApi/zodSchemas/candidate-self-schedule';
import { dayjsLocal, ScheduleUtils } from '@aglint/shared-utils';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { bookCandidateSelectedOption } from '@/services/CandidateSchedule/utils/bookingUtils/bookCandidateSelectedOption';
import { verifyRecruiterSelectedSlots } from '@/services/CandidateSchedule/utils/bookingUtils/verifyRecruiterSelctedOptions';

const candidateSelfSchedule = async (
  parsed: z.infer<typeof SchemaCandidateDirectBooking>,
) => {
  const { all_day_plans, cand_schedule, fetched_details } =
    await verifyRecruiterSelectedSlots({
      candidate_tz: parsed.cand_tz,
      filter_json_id: parsed.filter_id,
    });

  await bookCandidateSelectedOption(
    parsed,
    cand_schedule.db_details,
    verified_plans[0],
    schedule_db_details:{
      application_id: fetched_details.filter_json_data.applications.id,
      candidate: {
        first_name: fetched_details.filter_json_data.applications.,
        last_name: 'Doe',
      },
      company: {
        id: 1,
        name: 'Company',
      },
      job: {
        job_title: 'Job Title',
      },
    },
  );
};

const getCandFilteredSlots = (
  interviewer_selected_options: PlanCombinationRespType[],
  parsed_body: CandidateDirectBookingType,
  plans_time_zone: string,
) => {
  const int_rounds_length = ScheduleUtils.getSessionRounds(
    interviewer_selected_options[0].sessions.map((s) => ({
      break_duration: s.break_duration,
      session_duration: s.duration,
      session_order: s.session_order,
    })),
  ).length;
  if (parsed_body.selected_plan.length !== int_rounds_length) {
    throw new Error('invalid plan');
  }
  const cand_filtered_plans: PlanCombinationRespType[] = [];

  interviewer_selected_options.forEach((plan) => {
    const session_rounds = ScheduleUtils.getSessionRounds(
      plan.sessions.map((s) => ({
        ...s,
        break_duration: s.break_duration,
        session_duration: s.duration,
        session_order: s.session_order,
      })),
    ) as unknown as SessionCombinationRespType[][];
    let is_valid = true;
    for (
      let curr_round_idx = 0;
      curr_round_idx < session_rounds.length;
      ++curr_round_idx
    ) {
      if (
        dayjsLocal(session_rounds[curr_round_idx][0].start_time)
          .tz(plans_time_zone)
          .format() !== parsed_body.selected_plan[curr_round_idx].start_time &&
        dayjsLocal(
          session_rounds[curr_round_idx][
            session_rounds[curr_round_idx].length - 1
          ].end_time,
        )
          .tz(plans_time_zone)
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

export default createPageApiPostRoute(
  SchemaCandidateDirectBooking,
  candidateSelfSchedule,
);
