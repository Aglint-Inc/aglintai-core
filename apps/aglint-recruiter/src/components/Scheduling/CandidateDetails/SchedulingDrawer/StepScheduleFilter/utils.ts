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
    curr_round_date: string;
    plans: PlanCombinationRespType[];
  };
  preferredDateRanges: SchedulingFlow['filters']['preferredDateRanges'];
}) => {
  if (preferredDateRanges.length === 0) {
    return schedulingOptions;
  }

  return {
    curr_round_date: schedulingOptions.curr_round_date,
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
  const allFilteredOptions = schedulingOptions.map((option) =>
    option.interview_rounds.map((items) => {
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

      let noConflicts: PlanCombinationRespType[] = [];
      let softConflicts: PlanCombinationRespType[] = [];
      let hardConflicts: PlanCombinationRespType[] = [];
      let outSideWorkHours: PlanCombinationRespType[] = [];

      // Filter for no conflicts
      if (filters.isNoConflicts) {
        noConflicts = allOptions.plans.filter((option) =>
          option.sessions.every((session) => !session.is_conflict),
        );
      }

      // Filter for soft conflicts
      if (filters.isSoftConflicts) {
        softConflicts = allOptions.plans.filter((option) =>
          option.sessions.some((session) =>
            session.ints_conflicts.some((conflict) =>
              conflict.conflict_reasons.some(
                (reason) => reason.conflict_type === 'soft',
              ),
            ),
          ),
        );
      }

      // Filter for hard conflicts
      if (filters.isHardConflicts) {
        hardConflicts = allOptions.plans.filter((option) =>
          option.sessions.some((session) =>
            session.ints_conflicts.some((conflict) =>
              conflict.conflict_reasons.some(
                (reason) =>
                  reason.conflict_type !== 'soft' &&
                  reason.conflict_type !== 'out_of_working_hours',
              ),
            ),
          ),
        );
      }

      if (filters.isOutSideWorkHours) {
        outSideWorkHours = allOptions.plans.filter((option) =>
          option.sessions.some((session) =>
            session.ints_conflicts.some((conflict) =>
              conflict.conflict_reasons.some(
                (reason) => reason.conflict_type === 'out_of_working_hours',
              ),
            ),
          ),
        );
      }

      const allFilteredOptionsSet = new Set([
        ...noConflicts,
        ...softConflicts,
        ...hardConflicts,
        ...outSideWorkHours,
      ]);

      return [...allFilteredOptionsSet].filter(
        (option) => option.sessions.length > 0,
      );
    }),
  );

  const combs = createCombsForMultiDaySlots(allFilteredOptions).flatMap(
    (comb) => comb,
  );

  const numberNoConflicts = combs
    .map((comb) => comb.sessions.filter((session) => !session.is_conflict))
    .filter((comb) => {
      return comb.length === selectedSessionsNo;
    });

  const numberHardConflicts = combs
    .map((comb) =>
      comb.sessions.filter((session) =>
        session.ints_conflicts.some((conflict) =>
          conflict.conflict_reasons.some(
            (reason) =>
              reason.conflict_type !== 'soft' &&
              reason.conflict_type !== 'out_of_working_hours',
          ),
        ),
      ),
    )
    .filter((comb) => comb.length === selectedSessionsNo);

  const numberSoftConflicts = combs
    .map((comb) =>
      comb.sessions.filter((session) =>
        session.ints_conflicts.some((conflict) =>
          conflict.conflict_reasons.some(
            (reason) => reason.conflict_type === 'soft',
          ),
        ),
      ),
    )
    .filter((comb) => comb.length === selectedSessionsNo);

  const numberOutsideWorkHours = combs
    .map((comb) =>
      comb.sessions.filter((session) =>
        session.ints_conflicts.some((conflict) =>
          conflict.conflict_reasons.some(
            (reason) => reason.conflict_type === 'out_of_working_hours',
          ),
        ),
      ),
    )
    .filter((comb) => comb.length === selectedSessionsNo);

  return {
    combs: combs,
    numberNoConflicts: numberNoConflicts.length,
    numberHardConflicts: numberHardConflicts.length,
    numberSoftConflicts: numberSoftConflicts.length,
    numberOutsideWorkHours: numberOutsideWorkHours.length,
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
