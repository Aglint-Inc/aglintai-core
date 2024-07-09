/* eslint-disable security/detect-object-injection */
import {
  MultiDayPlanType,
  PlanCombinationRespType,
} from '@aglint/shared-types';
import dayjs from 'dayjs';

import { createCombsForMultiDaySlots } from '@/src/services/CandidateScheduleV2/utils/createCombsForMultiDaySlots';

import { ApiResponseFindAvailability } from '../../types';
import { SchedulingFlow } from '../store';

export const filterByDateRanges = ({
  schedulingOptions,
  preferredDateRanges,
}: {
  schedulingOptions: {
    curr_date: string;
    plans: PlanCombinationRespType[];
  };
  preferredDateRanges: SchedulingFlow['filters']['preferredDateRanges'];
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
  schedulingOptions: ApiResponseFindAvailability;
  filters: SchedulingFlow['filters'];
}) {
  let numberNoConflicts = 0;
  let numberHardConflicts = 0;
  let numberSoftConflicts = 0;
  let numberOutsideWorkHours = 0;

  const allFilteredOptions: ApiResponseFindAvailability = schedulingOptions.map(
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

  allCombs = allCombs
    .map(
      (comb) =>
        ({
          ...comb,
          plans: comb.plans.filter(
            (option) =>
              option.no_slot_reasons.length === 0 && option.sessions.length > 0,
          ),
        }) as MultiDayPlanType,
    )
    .filter((comb) => comb.plans.length > 0);

  allCombs = allCombs.map((comb) => {
    let noConflicts: PlanCombinationRespType[] = [];
    let softConflicts: PlanCombinationRespType[] = [];
    let hardConflicts: PlanCombinationRespType[] = [];
    let outsideWorkHours: PlanCombinationRespType[] = [];

    const addedPlans = new Set();

    if (filters.isNoConflicts) {
      noConflicts = comb.plans.filter((option) => {
        const isNoConflict = option.sessions.every(
          (session) => !session.is_conflict,
        );
        if (isNoConflict && !addedPlans.has(option)) {
          addedPlans.add(option);
          numberNoConflicts++;
          return true;
        }
        return false;
      });
    }

    if (filters.isOutSideWorkHours) {
      outsideWorkHours = comb.plans.filter((option) => {
        const isOutsideWorkHours = option.sessions.some(
          (session) =>
            session.conflict_types.includes('out_of_working_hours') &&
            !session.conflict_types.includes('soft') &&
            !session.conflict_types.includes('day_off') &&
            !session.conflict_types.includes('cal_event') &&
            !session.conflict_types.includes('calender_diconnected') &&
            !session.conflict_types.includes('day_load_reached') &&
            !session.conflict_types.includes('free_time') &&
            !session.conflict_types.includes('holiday') &&
            !session.conflict_types.includes('interviewer_paused') &&
            !session.conflict_types.includes('ooo') &&
            !session.conflict_types.includes('recruiting_blocks'),
        );
        if (isOutsideWorkHours && !addedPlans.has(option)) {
          addedPlans.add(option);
          numberOutsideWorkHours++;
          return true;
        }
        return false;
      });
    }

    if (filters.isSoftConflicts) {
      softConflicts = comb.plans.filter((option) => {
        const hasSoftConflict = option.sessions.every(
          (session) =>
            !session.is_conflict ||
            (session.conflict_types.includes('soft') &&
              !session.conflict_types.includes('day_off') &&
              !session.conflict_types.includes('cal_event') &&
              !session.conflict_types.includes('calender_diconnected') &&
              !session.conflict_types.includes('day_load_reached') &&
              !session.conflict_types.includes('free_time') &&
              !session.conflict_types.includes('holiday') &&
              !session.conflict_types.includes('interviewer_paused') &&
              !session.conflict_types.includes('ooo') &&
              !session.conflict_types.includes('out_of_working_hours') &&
              !session.conflict_types.includes('recruiting_blocks')),
        );
        if (hasSoftConflict && !addedPlans.has(option)) {
          addedPlans.add(option);
          numberSoftConflicts++;
          return true;
        }
        return false;
      });
    }

    if (filters.isHardConflicts) {
      hardConflicts = comb.plans.filter((option) => {
        const hasHardConflict = option.sessions.some(
          (session) =>
            !session.conflict_types.includes('soft') &&
            !session.conflict_types.includes('out_of_working_hours'),
        );
        if (hasHardConflict && !addedPlans.has(option)) {
          addedPlans.add(option);
          numberHardConflicts++;
          return true;
        }
        return false;
      });
    }

    const allConflicts = [
      ...noConflicts,
      ...softConflicts,
      ...hardConflicts,
      ...outsideWorkHours,
    ];

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

  return {
    combs: allCombs,
    numberNoConflicts,
    numberHardConflicts,
    numberSoftConflicts,
    numberOutsideWorkHours,
  };
}

export const hasPreferredInterviewers = ({
  session,
  filters,
}: {
  session: PlanCombinationRespType['sessions'][0];
  filters: SchedulingFlow['filters'];
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
