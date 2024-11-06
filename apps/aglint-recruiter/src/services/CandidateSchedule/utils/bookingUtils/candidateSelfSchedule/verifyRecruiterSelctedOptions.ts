import {
  type DatabaseTable,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import {
  CApiError,
  dayjsLocal,
  scheduling_options_schema,
} from '@aglint/shared-utils';

import { CandidatesScheduling } from '../../../CandidatesScheduling';

export const verifyRecruiterSelectedSlots = async ({
  candidate_tz,
  company_id,
  selected_options,
  session_ids,
}: {
  candidate_tz: string;
  company_id: string;
  selected_options: DatabaseTable['interview_filter_json']['selected_options'];
  session_ids: string[];
}) => {
  const { filered_selected_options, start_date_str, end_date_str } =
    sortSelctedPlans({ selected_options, candidate_tz, session_ids });
  const default_options = scheduling_options_schema.parse({});
  default_options.cand_end_time = 24;
  default_options.cand_start_time = 0;
  default_options.include_conflicting_slots = {
    ...default_options.include_conflicting_slots,
    out_of_working_hrs: true,
    show_soft_conflicts: true,
    interviewers_load: true,
    day_off: true,
    show_conflicts_events: true,
    holiday: true,
    interviewer_pause: true,
  };

  const cand_schedule = new CandidatesScheduling(default_options);
  await cand_schedule.fetchDetails({
    params: {
      req_user_tz: candidate_tz,
      end_date_str: end_date_str,
      company_id: company_id,
      session_ids: session_ids,
      start_date_str: start_date_str,
    },
  });

  const verified_slots = cand_schedule.verifyIntSelectedSlots(
    filered_selected_options,
  );

  if (verified_slots.length === 0) {
    throw new CApiError('CLIENT', 'All slots are booked or invalid');
  }
  return { cand_schedule, verified_slots };
};

const sortSelctedPlans = ({
  candidate_tz,
  selected_options,
  session_ids,
}: {
  selected_options: DatabaseTable['interview_filter_json']['selected_options'];
  session_ids: string[];
  candidate_tz: string;
}) => {
  let filered_selected_options: PlanCombinationRespType[] = [];
  filered_selected_options = selected_options.map((plan) => {
    const updated_plan = { ...plan };
    updated_plan.sessions = updated_plan.sessions.filter((s) =>
      session_ids.includes(s.session_id),
    );
    return updated_plan;
  });
  const sorted_options = filered_selected_options.sort(
    (plan1, plan2) =>
      dayjsLocal(plan1.sessions[0].start_time).unix() -
      dayjsLocal(plan2.sessions[0].start_time).unix(),
  );
  const start_date_str = dayjsLocal(sorted_options[0].sessions[0].start_time)
    .tz(candidate_tz)
    .startOf('date')
    .format('DD/MM/YYYY');
  const end_date_str = dayjsLocal(
    sorted_options[sorted_options.length - 1].sessions[
      sorted_options[0].sessions.length - 1
    ].end_time,
  )
    .tz(candidate_tz)
    .endOf('date')
    .format('DD/MM/YYYY');

  return {
    filered_selected_options,
    start_date_str,
    end_date_str,
  };
};
