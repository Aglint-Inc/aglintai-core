import {
  type CustomAgentInstructionPayload,
  type DatabaseTable,
  type PlanCombinationRespType,
  type TimeDurationDayjsType,
} from '@aglint/shared-types';
import { CApiError } from '@aglint/shared-utils';
import { type ProgressLoggerType } from '@aglint/shared-utils/src/request-workflow/utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import type { CandidatesSchedulingV2 } from '../CandidateScheduleV2/CandidatesSchedulingV2';

export const findCandSelectedSlots = async ({
  cand_avail,
  reqProgressLogger,
  request_assignee_tz,
  cand_schedule,
}: {
  cand_avail: DatabaseTable['candidate_request_availability']['slots'];
  reqProgressLogger: ProgressLoggerType;
  request_assignee_tz: string;
  cand_schedule: CandidatesSchedulingV2;
}) => {
  const ai_response: CustomAgentInstructionPayload['agent']['ai_response'] = {
    preferredInterviewer: [],
    excludeInterviewTimes: [],
    scheduleWithinNumDays: 3,
    maxOptionsToCandidates: 10,
    schedulewithMaxNumDays: 5,
    prefferredInterviewTimes: [
      {
        endTime: '18:00',
        startTime: '10:00',
      },
    ],
    balanceWorkloadAmongInterviewers: true,
    scheduleOutsideOfficeHoursForTimezoneDifferences: true,
  };
  const cand_picked_slots = cand_schedule.getCandidateSelectedSlots(cand_avail);
  const flatted_plans = cand_picked_slots
    .map((c) => c.selected_dates.flatMap((d) => d.plans))
    .flat();

  if (flatted_plans.every((plan) => plan.no_slot_reasons.length > 0)) {
    const all_conflict_reasons = flatted_plans
      .map((plan) => plan.no_slot_reasons)
      .flat();
    throw new CApiError(
      'CLIENT',
      `resolve these conflicts,  ${all_conflict_reasons.join(',')}`,
    );
  }

  let filtered_plans: PlanCombinationRespType[] = flatted_plans.filter(
    (plan) => plan.no_slot_reasons.length === 0,
  );
  if (filtered_plans.length === 0) {
    throw new CApiError(
      'CLIENT',
      `Not found any slots from the specified ${ai_response.schedulewithMaxNumDays} days`,
    );
  }

  const preferred_times: TimeDurationDayjsType[] =
    ai_response.prefferredInterviewTimes.map((t) => {
      const curr_day = dayjsLocal().tz(request_assignee_tz).startOf('day');
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
    const plan_start_time = dayjsLocal(plan.sessions[0].start_time).tz(
      request_assignee_tz,
    );
    const plan_end_time = dayjsLocal(
      plan.sessions[plan.sessions.length - 1].end_time,
    ).tz(request_assignee_tz);
    const is_plan_matches_preff_time = preferred_times.some((pref) => {
      pref.startTime = pref.startTime.set('date', plan_start_time.get('date'));
      pref.endTime = pref.endTime.set('date', plan_end_time.get('date'));
      return (
        plan_start_time.isSameOrAfter(pref.startTime, 'minutes') &&
        plan_end_time.isSameOrBefore(pref.endTime, 'minutes')
      );
    });
    return is_plan_matches_preff_time;
  });

  if (filtered_plans.length === 0) {
    throw new CApiError(
      'CLIENT',
      `Slots does not match the specified preffered times`,
    );
  }

  await reqProgressLogger({
    log: `Found ${filtered_plans.length} slots which matched candidate availability and given preference.`,
    is_progress_step: true,
    status: 'completed',
  });
  return filtered_plans;
};
