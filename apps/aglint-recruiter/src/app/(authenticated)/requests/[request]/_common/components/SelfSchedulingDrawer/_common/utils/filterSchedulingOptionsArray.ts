/* eslint-disable security/detect-object-injection */
import {
  type MultiDayPlanType,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { type ApiResponseFindAvailability } from '@requests/types';

import { createCombsForMultiDaySlots } from '@/services/CandidateSchedule/utils/createCombsForMultiDaySlots';
import { compareTimesHours } from '@/services/CandidateSchedule/utils/time_range_utils';

import { type SelfSchedulingFlow } from '../store/store';

export const filterByDateRanges = ({
  schedulingOptions,
  preferredTimeRanges,
  user_tz,
}: {
  schedulingOptions: {
    curr_date: string;
    plans: PlanCombinationRespType[];
  };
  preferredTimeRanges: SelfSchedulingFlow['filters']['preferredTimeRanges'];
  user_tz: string;
}) => {
  if (preferredTimeRanges.length === 0) {
    return schedulingOptions;
  }

  return {
    ...schedulingOptions,
    plans: schedulingOptions.plans.filter((option) => {
      return option.sessions.every((session) => {
        return preferredTimeRanges.some((dateRange) => {
          const l1 = compareTimesHours(
            session.start_time,
            dateRange.startTime,
            user_tz,
          );
          const l2 = compareTimesHours(
            session.end_time,
            dateRange.endTime,
            user_tz,
          );
          return l1 >= 0 && l2 <= 0;
        });
      });
    }),
  };
};

// actual function which generates slots
export function filterSchedulingOptionsArray({
  schedulingOptions,
  filters,
  user_tz = dayjsLocal.tz.guess(),
}: {
  schedulingOptions: ApiResponseFindAvailability['slots'];
  filters: Pick<
    SelfSchedulingFlow['filters'],
    | 'isHardConflicts'
    | 'isNoConflicts'
    | 'isOutSideWorkHours'
    | 'isSoftConflicts'
    | 'preferredTimeRanges'
    | 'isWorkLoad'
    | 'preferredInterviewers'
  >;
  user_tz?: string;
}) {
  const allFilteredOptions: ApiResponseFindAvailability['slots'] = (
    schedulingOptions || []
  ).map((option) => ({
    ...option,
    interview_rounds: option?.interview_rounds?.map((items) => {
      let allOptions = items;

      if (filters.preferredTimeRanges.length > 0) {
        allOptions = filterByDateRanges({
          schedulingOptions: allOptions,
          preferredTimeRanges: filters.preferredTimeRanges,
          user_tz,
        });
      }

      return allOptions;
    }),
  }));

  let allCombs: MultiDayPlanType[] =
    allFilteredOptions.length > 0
      ? createCombsForMultiDaySlots(allFilteredOptions)
      : [];

  // allCombs = allCombs
  //   .map(
  //     (comb) =>
  //       ({
  //         ...comb,
  //         plans: comb.plans.filter(
  //           (option) =>
  //             option.no_slot_reasons.length === 0 && option.sessions.length > 0,
  //         ),
  //       }) as MultiDayPlanType,
  //   )
  //   .filter((comb) => comb.plans.length > 0);

  let noConflictsCnt = 0;
  let softConflictsCnt = 0;
  let outWorkinHrsCnt = 0;
  let hardConflictsCnt = 0;
  allCombs = allCombs.map((comb) => {
    let noConflicts: PlanCombinationRespType[] = [];
    let softConflicts: PlanCombinationRespType[] = [];
    let hardConflicts: PlanCombinationRespType[] = [];
    let outsideWorkHours: PlanCombinationRespType[] = [];

    if (filters.isNoConflicts) {
      noConflicts = comb.plans.filter(
        (option) =>
          option.no_slot_reasons.length === 0 &&
          option.sessions.every(
            (session) => session.conflict_types.length === 0,
          ),
      );
    }

    if (filters.isSoftConflicts) {
      softConflicts = comb.plans.filter(
        (option) =>
          option.sessions.some((s) => s.conflict_types.includes('soft')) &&
          option.sessions.every(
            (session) =>
              session.conflict_types.length === 0 ||
              (session.conflict_types.length === 1 &&
                session.conflict_types.includes('soft')),
          ),
      );
    }

    if (filters.isHardConflicts) {
      hardConflicts = comb.plans.filter(
        (option) =>
          option.sessions.some((s) => s.conflict_types.length > 0) &&
          option.sessions.every(
            (s) =>
              s.conflict_types.length === 0 ||
              (!s.conflict_types.includes('soft') &&
                !s.conflict_types.includes('out_of_working_hours')),
          ),
      );
    }

    if (filters.isOutSideWorkHours) {
      outsideWorkHours = comb.plans.filter(
        (option) =>
          option.sessions.some((s) => s.conflict_types.length > 0) &&
          option.sessions.some((session) =>
            session.conflict_types.includes('out_of_working_hours'),
          ),
      );
    }

    const noSlotReasons = comb.plans.filter(
      (slot) => slot.no_slot_reasons.length > 0,
    );

    const allConflicts: PlanCombinationRespType[] = [
      ...noConflicts,
      ...softConflicts,
      ...hardConflicts,
      ...outsideWorkHours,
      ...noSlotReasons,
    ];

    noConflictsCnt += noConflicts.length;
    softConflictsCnt += softConflicts.length;
    outWorkinHrsCnt += outsideWorkHours.length;
    hardConflictsCnt += hardConflicts.length;

    return {
      date_range: comb.date_range,
      plans: allConflicts,
    } as MultiDayPlanType;
  });

  if (filters.isWorkLoad) {
    allCombs = allCombs.map(
      (comb) =>
        ({
          ...comb,
          plans: comb.plans
            .map((option) => {
              const totalWorkload = option.sessions.reduce(
                (acc, session) => acc + session.day_load_den,
                0,
              );
              return {
                ...option,
                totalWorkload,
              };
            })
            .sort((a, b) => a.totalWorkload - b.totalWorkload),
        }) as MultiDayPlanType,
    );
  }

  allCombs = allCombs.filter((comb) => comb.plans.length > 0);

  return {
    combs: allCombs,
    numberNoConflicts: noConflictsCnt,
    numberHardConflicts: hardConflictsCnt,
    numberSoftConflicts: softConflictsCnt,
    numberOutsideWorkHours: outWorkinHrsCnt,
    numberTotal:
      noConflictsCnt +
      hardConflictsCnt +
      softConflictsCnt +
      outWorkinHrsCnt +
      outWorkinHrsCnt,
  };
}
