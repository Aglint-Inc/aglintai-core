import { PlanCombinationRespType } from '@aglint/shared-types';
import { Stack, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { Checkbox } from '@/devlink/Checkbox';
import { ToggleButton } from '@/devlink2/ToggleButton';
import { SchedulerFilters } from '@/devlink3/SchedulerFilters';

import { setFilters, useSchedulingFlowStore } from '../store';
import PreferedInterviewers from './PreferedInterviewers';

function StepScheduleFilter() {
  const { dateRange, schedulingOptions, filters } = useSchedulingFlowStore(
    (state) => ({
      dateRange: state.dateRange,
      schedulingOptions: state.schedulingOptions,
      filters: state.filters,
    }),
  );

  let noConflicts = [];
  let softConflicts = [];
  let hardConflicts = [];

  noConflicts = filters.isNoConflicts
    ? schedulingOptions.filter(
        (option) =>
          option.sessions.every((session) => !session.is_conflict) &&
          (filters.preferredInterviewers.length === 0 ||
            option.sessions.some((session) =>
              filters.preferredInterviewers.some(
                (interviewer) =>
                  session.qualifiedIntervs.some(
                    (interv) => interv.user_id === interviewer.user_id,
                  ) ||
                  session.trainingIntervs.some(
                    (interv) => interv.user_id === interviewer.user_id,
                  ),
              ),
            )),
      )
    : [];

  softConflicts = filters.isSoftConflicts
    ? schedulingOptions.filter((option) => {
        return option.sessions.some(
          (session) =>
            session.ints_conflicts.some((conflict) =>
              conflict.conflict_reasons.some(
                (reason) => reason.conflict_type === 'soft',
              ),
            ) &&
            (filters.preferredInterviewers.length === 0 ||
              option.sessions.some((session) =>
                filters.preferredInterviewers.some(
                  (interviewer) =>
                    session.qualifiedIntervs.some(
                      (interv) => interv.user_id === interviewer.user_id,
                    ) ||
                    session.trainingIntervs.some(
                      (interv) => interv.user_id === interviewer.user_id,
                    ),
                ),
              )),
        );
      })
    : [];

  hardConflicts = filters.isHardConflicts
    ? schedulingOptions.filter((option) => {
        return option.sessions.some((session) =>
          session.ints_conflicts.some(
            (conflict) =>
              conflict.conflict_reasons.some(
                (reason) => reason.conflict_type !== 'soft',
              ) &&
              (filters.preferredInterviewers.length === 0 ||
                option.sessions.some((session) =>
                  filters.preferredInterviewers.some(
                    (interviewer) =>
                      session.qualifiedIntervs.some(
                        (interv) => interv.user_id === interviewer.user_id,
                      ) ||
                      session.trainingIntervs.some(
                        (interv) => interv.user_id === interviewer.user_id,
                      ),
                  ),
                )),
          ),
        );
      })
    : [];

  return (
    <>
      <SchedulerFilters
        textDateRange={`${dayjs(dateRange.start_date).format('MMMM DD')} - ${dayjs(dateRange.end_date).format('MMMM DD')}`}
        slotCheckbox={
          <Checkbox
            isChecked={filters.isWorkLoad}
            onClickCheck={{
              onClick: () => {
                setFilters({
                  isWorkLoad: !filters.isWorkLoad,
                });
              },
            }}
          />
        }
        slotTimeRangeSearch={<TextField />}
        textNumberNoConflicts={noConflicts.length}
        textNumberHardConflicts={hardConflicts.length}
        textNumberSoftConflicts={softConflicts.length}
        textNumberOutsideWorkHours={0}
        slotPreferedInterviewersSearch={<PreferedInterviewers />}
        slotSuggestionControlTooltip={
          <>
            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              sx={{
                cursor: 'pointer',
              }}
            >
              <ToggleButton
                isActive={filters.isNoConflicts}
                isInactive={!filters.isNoConflicts}
                onclickToggle={{
                  onClick: () => {
                    setFilters({
                      isNoConflicts: !filters.isNoConflicts,
                    });
                  },
                }}
              />
              <Typography variant={'body2'}>Show only no conflicts</Typography>
            </Stack>
            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              sx={{
                cursor: 'pointer',
              }}
            >
              <ToggleButton
                isActive={filters.isSoftConflicts}
                isInactive={!filters.isSoftConflicts}
                onclickToggle={{
                  onClick: () => {
                    setFilters({
                      isSoftConflicts: !filters.isSoftConflicts,
                    });
                  },
                }}
              />
              <Typography variant={'body2'}>
                Show soft conflict suggestions
              </Typography>
            </Stack>
            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              sx={{
                cursor: 'pointer',
              }}
            >
              <ToggleButton
                isActive={filters.isHardConflicts}
                isInactive={!filters.isHardConflicts}
                onclickToggle={{
                  onClick: () => {
                    setFilters({
                      isHardConflicts: !filters.isHardConflicts,
                    });
                  },
                }}
              />
              <Typography variant={'body2'}>
                Show hard conflict suggestions
              </Typography>
            </Stack>
            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              sx={{
                cursor: 'pointer',
              }}
            >
              <ToggleButton
                isActive={filters.isOutSideWorkHours}
                isInactive={!filters.isOutSideWorkHours}
                onclickToggle={{
                  onClick: () => {
                    setFilters({
                      isOutSideWorkHours: !filters.isOutSideWorkHours,
                    });
                  },
                }}
              />
              <Typography variant={'body2'}>
                Suggest times over outside work hours
              </Typography>
            </Stack>
          </>
        }
      />
    </>
  );
}

export default StepScheduleFilter;
