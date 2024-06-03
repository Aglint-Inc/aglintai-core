import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { ToggleButton } from '@/devlink2/ToggleButton';
import { SchedulerFilters } from '@/devlink3/SchedulerFilters';

import { setFilters, useSchedulingFlowStore } from '../store';
import DateRangeField from './DateRangeField';
import PreferedInterviewers from './PreferedInterviewers';
import { filterByDateRanges, filterSchedulingOptions } from './utils';

function StepScheduleFilter() {
  const { dateRange, schedulingOptions, filters } = useSchedulingFlowStore(
    (state) => ({
      dateRange: state.dateRange,
      schedulingOptions: state.schedulingOptions,
      filters: state.filters,
    }),
  );

  const dateFilteredOptions = useMemo(
    () =>
      filterByDateRanges({
        schedulingOptions,
        preferredDateRanges: filters.preferredDateRanges,
      }),
    [schedulingOptions, filters.preferredDateRanges],
  );

  const { noConflicts, softConflicts, hardConflicts, outSideWorkHours } =
    useMemo(
      () =>
        filterSchedulingOptions({
          schedulingOptions: dateFilteredOptions,
          filters,
        }),
      [
        dateFilteredOptions,
        filters.isNoConflicts,
        filters.isSoftConflicts,
        filters.isHardConflicts,
        filters.isOutSideWorkHours,
        filters.preferredInterviewers,
      ],
    );

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
        slotTimeRangeSelector={<DateRangeField />}
        textNumberNoConflicts={noConflicts.length}
        textNumberHardConflicts={hardConflicts.length}
        textNumberSoftConflicts={softConflicts.length}
        textNumberOutsideWorkHours={outSideWorkHours.length}
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
