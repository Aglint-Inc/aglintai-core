/* eslint-disable security/detect-object-injection */
import { PlanCombinationRespType } from '@aglint/shared-types';
import dayjs from 'dayjs';

import { ApiResponseFindAvailability } from '../../types';
import { SchedulingFlow } from '../store';

export const filterByDateRanges = ({
  schedulingOptions,
  preferredDateRanges,
}: {
  schedulingOptions: ApiResponseFindAvailability;
  preferredDateRanges: SchedulingFlow['filters']['preferredDateRanges'];
}) => {
  if (preferredDateRanges.length === 0) {
    return schedulingOptions
      .flatMap((option) => option)
      .flatMap((option) => option);
  }

  return schedulingOptions
    .flatMap((option) => option)
    .flatMap((option) => option)
    .filter((option) => {
      // Group sessions by date
      const sessionsByDate: {
        [date: string]: PlanCombinationRespType['sessions'];
      } = option.sessions.reduce((acc, session) => {
        const date = dayjs(session.start_time).format('YYYY-MM-DD');
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(session);
        return acc;
      }, {});

      // Check each day's sessions against the preferred date ranges
      return Object.values(sessionsByDate).every((daySessions) => {
        const firstSessionStartTime = extractTime(daySessions[0].start_time);
        const lastSessionEndTime = extractTime(
          daySessions[daySessions.length - 1].end_time,
        );

        return preferredDateRanges.some((dateRange) => {
          const rangeStartTime = extractTime(dateRange.startTime);
          const rangeEndTime = extractTime(dateRange.endTime);

          return (
            firstSessionStartTime >= rangeStartTime &&
            lastSessionEndTime <= rangeEndTime
          );
        });
      });
    });
};

export function filterSchedulingOptions({
  schedulingOptions,
  filters,
}: {
  schedulingOptions: PlanCombinationRespType[];
  filters: SchedulingFlow['filters'];
}) {
  let noConflicts: PlanCombinationRespType[] = [];
  let softConflicts: PlanCombinationRespType[] = [];
  let hardConflicts: PlanCombinationRespType[] = [];
  let outSideWorkHours: PlanCombinationRespType[] = [];

  // Helper function to check if a session has preferred interviewers
  const hasPreferredInterviewers = (session) => {
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

  // Filter for no conflicts
  if (filters.isNoConflicts) {
    noConflicts = schedulingOptions.filter(
      (option) =>
        option.sessions.every((session) => !session.is_conflict) &&
        option.sessions.some((session) => hasPreferredInterviewers(session)),
    );
  }

  // Filter for soft conflicts
  if (filters.isSoftConflicts) {
    softConflicts = schedulingOptions.filter((option) =>
      option.sessions.some(
        (session) =>
          session.ints_conflicts.some((conflict) =>
            conflict.conflict_reasons.some(
              (reason) => reason.conflict_type === 'soft',
            ),
          ) && hasPreferredInterviewers(session),
      ),
    );
  }

  // Filter for hard conflicts
  if (filters.isHardConflicts) {
    hardConflicts = schedulingOptions.filter((option) =>
      option.sessions.some(
        (session) =>
          session.ints_conflicts.some((conflict) =>
            conflict.conflict_reasons.some(
              (reason) =>
                reason.conflict_type !== 'soft' &&
                reason.conflict_type !== 'out_of_working_hours',
            ),
          ) && hasPreferredInterviewers(session),
      ),
    );
  }

  if (filters.isOutSideWorkHours) {
    outSideWorkHours = schedulingOptions.filter((option) =>
      option.sessions.some(
        (session) =>
          session.ints_conflicts.some((conflict) =>
            conflict.conflict_reasons.some(
              (reason) => reason.conflict_type === 'out_of_working_hours',
            ),
          ) && hasPreferredInterviewers(session),
      ),
    );
  }

  return {
    noConflicts,
    softConflicts,
    hardConflicts,
    outSideWorkHours,
    allFilteredOptions: [
      ...noConflicts,
      ...softConflicts,
      ...hardConflicts,
      ...outSideWorkHours,
    ],
  };
}

const extractTime = (datetime) => {
  return dayjs(datetime).format('HH:mm');
};

export function filterSchedulingOptionsArray({
  schedulingOptions,
  filters,
}: {
  schedulingOptions: ApiResponseFindAvailability;
  filters: SchedulingFlow['filters'];
}) {
  // Helper function to check if a session has preferred interviewers
  const hasPreferredInterviewers = (session) => {
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

  const allFilteredOptions: ApiResponseFindAvailability = schedulingOptions.map(
    (option) =>
      option.map((items) => {
        let allOptions = items;

        if (filters.preferredDateRanges.length > 0) {
          allOptions = filterByDateRanges({
            schedulingOptions: [[allOptions]],
            preferredDateRanges: filters.preferredDateRanges,
          });
        }

        let noConflicts: PlanCombinationRespType[] = [];
        let softConflicts: PlanCombinationRespType[] = [];
        let hardConflicts: PlanCombinationRespType[] = [];
        let outSideWorkHours: PlanCombinationRespType[] = [];

        // Filter for no conflicts
        if (filters.isNoConflicts) {
          noConflicts = allOptions.filter(
            (option) =>
              option.sessions.every((session) => !session.is_conflict) &&
              option.sessions.some((session) =>
                hasPreferredInterviewers(session),
              ),
          );
        }

        // Filter for soft conflicts
        if (filters.isSoftConflicts) {
          softConflicts = allOptions.filter((option) =>
            option.sessions.some(
              (session) =>
                session.ints_conflicts.some((conflict) =>
                  conflict.conflict_reasons.some(
                    (reason) => reason.conflict_type === 'soft',
                  ),
                ) && hasPreferredInterviewers(session),
            ),
          );
        }

        // Filter for hard conflicts
        if (filters.isHardConflicts) {
          hardConflicts = allOptions.filter((option) =>
            option.sessions.some(
              (session) =>
                session.ints_conflicts.some((conflict) =>
                  conflict.conflict_reasons.some(
                    (reason) =>
                      reason.conflict_type !== 'soft' &&
                      reason.conflict_type !== 'out_of_working_hours',
                  ),
                ) && hasPreferredInterviewers(session),
            ),
          );
        }

        if (filters.isOutSideWorkHours) {
          outSideWorkHours = allOptions.filter((option) =>
            option.sessions.some(
              (session) =>
                session.ints_conflicts.some((conflict) =>
                  conflict.conflict_reasons.some(
                    (reason) => reason.conflict_type === 'out_of_working_hours',
                  ),
                ) && hasPreferredInterviewers(session),
            ),
          );
        }

        return [
          ...noConflicts,
          ...softConflicts,
          ...hardConflicts,
          ...outSideWorkHours,
        ];
      }),
  );

  return {
    allFilteredOptions,
  };
}
