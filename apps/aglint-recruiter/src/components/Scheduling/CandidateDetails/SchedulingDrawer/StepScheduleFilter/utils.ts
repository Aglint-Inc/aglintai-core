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

  console.log(allFilteredOptions, 'allFilteredOptions');

  const allCombs: MultiDayPlanType[] =
    createCombsForMultiDaySlots(schedulingOptions);

  console.log(allCombs, 'allCombs');

  allCombs.map((comb) => {
    let noConflicts: PlanCombinationRespType[] = [];
    let softConflicts: PlanCombinationRespType[] = [];
    let hardConflicts: PlanCombinationRespType[] = [];
    let outsideWorkHours: PlanCombinationRespType[] = [];

    if (filters.isNoConflicts) {
      noConflicts = comb.plans.filter((option) =>
        option.sessions.every((session) => !session.is_conflict),
      );
    }

    if (filters.isSoftConflicts) {
      softConflicts = comb.plans.filter((option) =>
        option.sessions.some((session) =>
          session.conflict_types.includes('soft'),
        ),
      );
    }

    if (filters.isHardConflicts) {
      hardConflicts = comb.plans.filter((option) =>
        option.sessions.some(
          (session) =>
            !session.conflict_types.includes('soft') &&
            !session.conflict_types.includes('out_of_working_hours'),
        ),
      );
    }

    if (filters.isOutSideWorkHours) {
      outsideWorkHours = comb.plans.filter((option) =>
        option.sessions.some(
          (session) =>
            session.conflict_types.includes('out_of_working_hours') &&
            !session.conflict_types.includes('soft'),
        ),
      );
    }

    const allConflicts = [
      ...new Set([
        ...noConflicts,
        ...softConflicts,
        ...hardConflicts,
        ...outsideWorkHours,
      ]),
    ];

    return {
      date_range: comb.date_range,
      plans: allConflicts,
    } as MultiDayPlanType;
  });

  if (filters.preferredInterviewers.length > 0) {
    allCombs.map(
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
    allCombs.map(
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
    numberNoConflicts: 0,
    numberHardConflicts: 0,
    numberSoftConflicts: 0,
    numberOutsideWorkHours: 0,
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
