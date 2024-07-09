/* eslint-disable security/detect-object-injection */
import { PlanCombinationRespType } from '@aglint/shared-types';
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
  selectedSessionsNo,
}: {
  schedulingOptions: ApiResponseFindAvailability;
  filters: SchedulingFlow['filters'];
  selectedSessionsNo: number;
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

        if (filters.isWorkLoad) {
          allOptions.plans
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
            .sort((a, b) => a.totalWorkload - b.totalWorkload);
        }

        if (filters.preferredInterviewers.length > 0) {
          allOptions.plans.sort((a, b) => {
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
          });
        }

        let noConflicts: ApiResponseFindAvailability[0]['interview_rounds'][0]['plans'] =
          null;
        let softConflicts: ApiResponseFindAvailability[0]['interview_rounds'][0]['plans'] =
          null;
        let hardConflicts: ApiResponseFindAvailability[0]['interview_rounds'][0]['plans'] =
          null;
        let outSideWorkHours: ApiResponseFindAvailability[0]['interview_rounds'][0]['plans'] =
          null;

        // Filter for no conflicts
        if (filters.isNoConflicts) {
          noConflicts = allOptions.plans.filter((option) =>
            option.sessions.every(
              (session) => session.conflict_types.length === 0,
            ),
          );
        }

        // Filter for soft conflicts
        if (filters.isSoftConflicts) {
          softConflicts = allOptions.plans.filter((option) =>
            option.sessions.every(
              (session) =>
                session.conflict_types.length > 0 &&
                (session.conflict_types.every(
                  (conflict) => conflict === 'soft',
                ) ||
                  session.conflict_types.length === 0),
            ),
          );
        }

        // Filter for hard conflicts
        if (filters.isHardConflicts) {
          hardConflicts = allOptions.plans.filter((option) =>
            option.sessions.some((session) =>
              session.conflict_types.some(
                (conflict) =>
                  conflict !== 'soft' && conflict !== 'out_of_working_hours',
              ),
            ),
          );
        }

        // Filter for out of working hours
        if (filters.isOutSideWorkHours) {
          outSideWorkHours = allOptions.plans.filter((option) =>
            option.sessions.some((session) =>
              session.conflict_types.includes('out_of_working_hours'),
            ),
          );
        }

        const filteredOptions = {
          ...allOptions,
          plans: [
            ...new Set([
              ...(noConflicts ? noConflicts : []),
              ...(hardConflicts ? hardConflicts : []),
              ...(outSideWorkHours ? outSideWorkHours : []),
              ...(softConflicts ? softConflicts : []),
            ]),
          ],
        };

        return filteredOptions;
      }),
    }),
  );
  console.log(allFilteredOptions, 'allFilteredOptions');

  const combs = createCombsForMultiDaySlots(schedulingOptions).flatMap(
    (comb) => comb,
  );

  console.log(combs, 'combs');

  return {
    combs: combs,
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
