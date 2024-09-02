/* eslint-disable security/detect-object-injection */
import {
  type MultiDayPlanType,
  type PlanCombinationRespType,
} from '@aglint/shared-types';
import dayjs from 'dayjs';

import { type ApiResponseFindAvailability } from '@/src/components/Scheduling/CandidateDetails/types';
import { createCombsForMultiDaySlots } from '@/src/services/CandidateScheduleV2/utils/createCombsForMultiDaySlots';

import { type SelfSchedulingFlow } from '../../store';

export const filterByDateRanges = ({
  schedulingOptions,
  preferredDateRanges,
}: {
  schedulingOptions: {
    curr_date: string;
    plans: PlanCombinationRespType[];
  };
  preferredDateRanges: SelfSchedulingFlow['filters']['preferredDateRanges'];
}) => {
  if (preferredDateRanges.length === 0) {
    return schedulingOptions;
  }

  return {
    ...schedulingOptions,
    plans: schedulingOptions.plans.filter((option) => {
      return option.sessions.every((session) => {
        return preferredDateRanges.some((dateRange) => {
          const sessionStartTime = extractTime(session.start_time);
          const sessionEndTime = extractTime(session.end_time);
          return (
            sessionStartTime >= extractTime(dateRange.startTime) &&
            sessionEndTime <= extractTime(dateRange.endTime)
          );
        });
      });
    }),
  };
};

const extractTime = (datetime) => {
  return dayjs(datetime).format('HH:mm');
};

// actual function which generates slots
export function filterSchedulingOptionsArray({
  schedulingOptions,
  filters,
}: {
  schedulingOptions: ApiResponseFindAvailability['slots'];
  filters: SelfSchedulingFlow['filters'];
}) {
  const allFilteredOptions: ApiResponseFindAvailability['slots'] = schedulingOptions.map(
    (option) => ({
      ...option,
      interview_rounds: option.interview_rounds.map((items) => {
        let allOptions = items;

        if (filters.preferredDateRanges.length > 0) {
          allOptions = filterByDateRanges({
            schedulingOptions: allOptions,
            preferredDateRanges: filters.preferredDateRanges,
          });
        }

        return allOptions;
      }),
    }),
  );

  let allCombs: MultiDayPlanType[] =
    createCombsForMultiDaySlots(allFilteredOptions);

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

  if (filters.preferredInterviewers.length > 0) {
    allCombs = allCombs.map(
      (comb) =>
        ({
          ...comb,
          plans: comb.plans.sort((a, b) => {
            const aHasPreferred = a.sessions.some((session) =>
              hasPreferredInterviewers({ session, filters }),
            )
              ? 0
              : 1;
            const bHasPreferred = b.sessions.some((session) =>
              hasPreferredInterviewers({ session, filters }),
            )
              ? 0
              : 1;
            return aHasPreferred - bHasPreferred;
          }),
        }) as MultiDayPlanType,
    );
  }

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

export const hasPreferredInterviewers = ({
  session,
  filters,
}: {
  session: PlanCombinationRespType['sessions'][0];
  filters: SelfSchedulingFlow['filters'];
}) => {
  return (
    filters.preferredInterviewers.length === 0 ||
    filters.preferredInterviewers.some(
      (interviewer) =>
        session.qualifiedIntervs.some(
          (interv) => interv.user_id === interviewer.user_id,
        ) ||
        session.trainingIntervs.some(
          (interv) => interv.user_id === interviewer.user_id,
        ),
    )
  );
};
