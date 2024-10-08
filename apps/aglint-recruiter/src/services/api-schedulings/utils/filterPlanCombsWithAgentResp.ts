import {
  type PlanCombinationRespType,
  type TimeDurationDayjsType,
} from '@aglint/shared-types';
import { CApiError, dayjsLocal } from '@aglint/shared-utils';

import { type extractPreferredInterviewers } from '../textTransforms/extractPreferredInterviewers';
import { type selfScheduleLinkInstruction } from '../textTransforms/selfScheduleLinkInstruction';
import { compareTimes } from '@/services/CandidateSchedule/utils/time_range_utils';

export const filterPlanCombsWithAgentResp = ({
  flattened_plans,
  ai_response,
  preferred_interviewers,
  time_zone,
}: {
  flattened_plans: PlanCombinationRespType[];
  ai_response: Awaited<ReturnType<typeof selfScheduleLinkInstruction>>;
  preferred_interviewers: Awaited<
    ReturnType<typeof extractPreferredInterviewers>
  >;
  time_zone: string;
}) => {
  // Filter out plans with hard conflicts
  let filtered_plans = flattened_plans.filter((plan) => {
    const all_conf_types = plan.sessions
      .map((session) => session.conflict_types)
      .flat();

    return all_conf_types.every(
      (conf) =>
        conf == 'soft' || conf == 'out_of_working_hours' || conf == 'free_time',
    );
  });

  if (filtered_plans.length === 0) {
    throw new CApiError(
      'CLIENT',
      'Found All Plans with Hard Conflicts. Please resolve and try Schedule again .',
    );
  }
  // Filter out plans with dates outside the preferred dates
  filtered_plans = filtered_plans.filter((plan) => {
    const plan_date = dayjsLocal(plan.sessions[0].start_time).tz(time_zone);
    return (
      plan_date.isSameOrAfter(
        dayjsLocal(
          ai_response.candidateAvailability.preferredDates.startDate,
        ).tz(time_zone),
        'date',
      ) &&
      plan_date.isSameOrBefore(
        dayjsLocal(ai_response.candidateAvailability.preferredDates.endDate).tz(
          time_zone,
        ),
        'date',
      )
    );
  });

  if (filtered_plans.length === 0) {
    throw new CApiError(
      'CLIENT',
      'No plans found within the preferred dates .',
    );
  }

  // Filter out plans with preferred interviewers
  filtered_plans = filtered_plans.filter((plan) => {
    const inters = plan.sessions
      .map((session) => session.qualifiedIntervs)
      .flat()
      .map((interv) => interv.user_id);
    return inters.some((int) =>
      preferred_interviewers.interviewers.some(
        (pref_int) => pref_int.user_id === int,
      ),
    );
  });

  if (filtered_plans.length === 0) {
    throw new CApiError(
      'CLIENT',
      'No plans found with preferred interviewers .',
    );
  }

  // Filter out plans with out of working hours conflicts
  if (!ai_response.include_outside_working_hours) {
    filtered_plans = filtered_plans.filter((plan) => {
      const all_conf_types = plan.sessions
        .map((session) => session.conflict_types)
        .flat();
      return all_conf_types.every((conf) => conf !== 'out_of_working_hours');
    });
    if (filtered_plans.length === 0) {
      throw new CApiError(
        'CLIENT',
        'Found plans with out of working hours conflicts please resolve and try Schedule again .',
      );
    }
  }
  // Filter out plans with soft conflicts
  if (!ai_response.includeAllSoftConflictSlots) {
    filtered_plans = filtered_plans.filter((plan) => {
      const all_conf_types = plan.sessions
        .map((session) => session.conflict_types)
        .flat();
      return all_conf_types.every((conf) => conf !== 'soft');
    });
    if (filtered_plans.length === 0) {
      throw new CApiError(
        'CLIENT',
        'Found plans with soft conflicts please resolve and try Schedule again .',
      );
    }
  }

  const ai_resp_preferred_time =
    ai_response.candidateAvailability.prefferredTime;
  // Filter out plans with preferred time range
  const time_filtered_plans = filtered_plans.filter((plan) => {
    return (
      compareTimes(
        plan.sessions[0].start_time,
        ai_resp_preferred_time.startTime,
        time_zone,
      ) >= 0 &&
      compareTimes(
        plan.sessions[plan.sessions.length - 1].end_time,
        ai_resp_preferred_time.endTime,
        time_zone,
      ) <= 0
    );
  });
  if (time_filtered_plans.length === 0) {
    throw new CApiError(
      'CLIENT',
      'No plans found within the preferred time range .',
    );
  }

  return time_filtered_plans.slice(0, ai_response.maxTotalSlots);
};
