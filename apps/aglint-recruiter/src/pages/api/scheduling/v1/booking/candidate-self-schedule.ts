/* eslint-disable security/detect-object-injection */
import {
  type CandidateDirectBookingType,
  type PlanCombinationRespType,
  type SessionCombinationRespType,
} from '@aglint/shared-types';
import { SchemaCandidateDirectBooking } from '@aglint/shared-types/src/aglintApi/zodSchemas/candidate-self-schedule';
import { CApiError, dayjsLocal, ScheduleUtils } from '@aglint/shared-utils';
import { type z } from 'zod';

import { createPageApiPostRoute } from '@/apiUtils/createPageApiPostRoute';
import { CandidatesScheduling } from '@/services/CandidateSchedule/CandidatesScheduling';
import { bookCandidateSelectedOption } from '@/services/CandidateSchedule/utils/bookingUtils/bookCandidateSelectedOption';
import { fetchDBScheduleDetails } from '@/services/CandidateSchedule/utils/bookingUtils/dbFetch/fetchDBScheduleDetails';

const candidateSelfSchedule = async (
  parsed: z.infer<typeof SchemaCandidateDirectBooking>,
) => {
  const schedule_db_details = await fetchDBScheduleDetails(parsed);

  const { filtered_selected_options, company, plans_time_zone } =
    schedule_db_details;
  const interviewer_selected_options = filtered_selected_options;

  const cand_filtered_plans: PlanCombinationRespType[] = getCandFilteredSlots(
    interviewer_selected_options,
    parsed,
    plans_time_zone,
  );

  const cand_schedule = new CandidatesScheduling({
    include_conflicting_slots: {
      show_conflicts_events: true,
      show_soft_conflicts: true,
      out_of_working_hrs: true,
    },
    cand_start_time: 0,
    cand_end_time: 24,
  });

  await cand_schedule.fetchDetails({
    params: {
      req_user_tz: plans_time_zone,
      start_date_str: schedule_db_details.dates.start_date_str,
      end_date_str: schedule_db_details.dates.end_date_str,
      company_id: company.id,
      session_ids: interviewer_selected_options[0].sessions.map(
        (s) => s.session_id,
      ),
    },
  });
  //
  if (!cand_schedule.db_details) {
    throw new CApiError('SERVER_ERROR', 'No db details found');
  }

  const verified_plans =
    cand_schedule.verifyIntSelectedSlots(cand_filtered_plans);
  if (verified_plans.length === 0) {
    throw new Error('Requested plan does not exist');
  }

  await bookCandidateSelectedOption(
    parsed,
    cand_schedule.db_details,
    verified_plans[0],
    schedule_db_details,
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
