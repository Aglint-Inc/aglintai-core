import {
  APIOptions,
  DatabaseTable,
  PlanCombinationRespType,
  TimeDurationDayjsType,
} from '@aglint/shared-types';
import { ApiError } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { CandidatesSchedulingV2 } from '../CandidateScheduleV2/CandidatesSchedulingV2';
import { ProgressLoggerType } from './utils';

type AiResponseType = {
  scheduleWithinNumDays: number;
  schedulewithMaxNumDays: number;
  maxOptionsToCandidates: number;
  balanceWorkloadAmongInterviewers: boolean;
  scheduleOutsideOfficeHoursForTimezoneDifferences: boolean;
  preferredInterviewer: string[];
  excludeInterviewTimes: { startTime: string; endTime: string }[];
  prefferredInterviewTimes: { startTime: string; endTime: string }[];
  bookOnSoftConflicts: boolean;
};

const TIME_ZONE = 'Asia/Colombo';
export const findCandSelectedSlots = async ({
  api_options,
  company_id,
  end_date_str,
  req_user_tz,
  session_ids,
  start_date_str,
  cand_avail,
  reqProgressLogger,
  ai_response,
}: {
  api_options: APIOptions;
  session_ids: string[];
  end_date_str: string;
  start_date_str: string;
  company_id: string;
  req_user_tz: string;
  cand_avail: DatabaseTable['candidate_request_availability']['slots'];
  reqProgressLogger: ProgressLoggerType;
  ai_response: AiResponseType;
}) => {
  const cand_schedule = new CandidatesSchedulingV2(api_options);
  await cand_schedule.fetchDetails({
    session_ids,
    start_date_str,
    end_date_str,
    company_id,
    req_user_tz,
  });
  const cand_picked_slots = cand_schedule.getCandidateSelectedSlots(cand_avail);
  const flatted_plans = cand_picked_slots
    .map((c) => c.selected_dates.flatMap((d) => d.plans))
    .flat();

  if (flatted_plans.every((plan) => plan.no_slot_reasons.length > 0)) {
    const all_conflict_reasons = flatted_plans
      .map((plan) => plan.no_slot_reasons)
      .flat();
    throw new ApiError(
      'CLIENT',
      `Unable to these conflicts,  ${all_conflict_reasons.join(',')}`,
    );
  }

  let max_specified_day = dayjsLocal()
    .tz(TIME_ZONE)
    .startOf('day')
    .add(ai_response.schedulewithMaxNumDays, 'day');
  let filtered_plans: PlanCombinationRespType[] = flatted_plans.filter(
    (plan) => {
      if (plan.sessions.length === 0) return false;
      let plan_date = dayjsLocal(plan.sessions[0].start_time).tz(TIME_ZONE);
      return plan_date.isSameOrBefore(max_specified_day, 'date');
    },
  );
  if (filtered_plans.length === 0) {
    throw new ApiError(
      'CLIENT',
      `Not found any slots from the specified ${ai_response.schedulewithMaxNumDays} days`,
    );
  }

  const preferred_times: TimeDurationDayjsType[] =
    ai_response.prefferredInterviewTimes.map((t) => {
      let curr_day = dayjsLocal().tz(TIME_ZONE).startOf('day');
      return {
        startTime: curr_day
          .set('hour', Number(t.startTime.split(':')[0]))
          .set('minutes', Number(t.startTime.split(':')[1])),
        endTime: curr_day
          .set('hour', Number(t.endTime.split(':')[0]))
          .set('minutes', Number(t.endTime.split(':')[1])),
      };
    });
  // given specified prefferred times
  filtered_plans = filtered_plans.filter((plan) => {
    let plan_start_time = dayjsLocal(plan.sessions[0].start_time).tz(TIME_ZONE);
    let plan_end_time = dayjsLocal(
      plan.sessions[plan.sessions.length - 1].end_time,
    ).tz(TIME_ZONE);
    const is_plan_matches_preff_time = preferred_times.some((pref) => {
      pref.startTime = pref.startTime.set('day', plan_start_time.get('day'));
      pref.endTime = pref.endTime.set('day', plan_start_time.get('day'));
      return (
        plan_start_time.isSameOrAfter(pref.startTime, 'minutes') &&
        plan_end_time.isSameOrBefore(pref.endTime, 'minutes')
      );
    });
    return is_plan_matches_preff_time;
  });

  if (filtered_plans.length === 0) {
    throw new ApiError(
      'CLIENT',
      `Slots does not match the specified preffered times`,
    );
  }

  await reqProgressLogger({
    log: `Found ${filtered_plans.length} slots which matched candidate availability and given preference.`,

    event_type: 'FIND_SUITABLE_SLOTS',
    is_progress_step: true,
    status: 'completed',
  });
  return filtered_plans;
};
