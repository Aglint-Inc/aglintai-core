import { Checkbox, Stack, Switch, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { SchedulerFilters } from '@/devlink3/SchedulerFilters';

import { setFilters, useSchedulingFlowStore } from '../store';
import DateRangeField from './DateRangeField';
import PreferedInterviewers from './PreferedInterviewers';
import { filterSchedulingOptionsArray } from './utils';

function StepScheduleFilter() {
  const { dateRange, schedulingOptions, filters } = useSchedulingFlowStore(
    (state) => ({
      dateRange: state.dateRange,
      schedulingOptions: state.schedulingOptions,
      filters: state.filters,
    }),
  );

  const {
    numberHardConflicts,
    numberNoConflicts,
    numberOutsideWorkHours,
    numberSoftConflicts,
  } = useMemo(
    () =>
      filterSchedulingOptionsArray({
        schedulingOptions,
        filters,
      }),
    [filters],
  );

  return (
    <Stack height={'calc(100vh - 96px)'}>
      <SchedulerFilters
        textDateRange={`${dayjs(dateRange.start_date).format('MMMM DD')} - ${dayjs(dateRange.end_date).format('MMMM DD')}`}
        slotCheckbox={
          <Checkbox
            size='small'
            checked={filters.isWorkLoad}
            onChange={() => {
              setFilters({
                isWorkLoad: !filters.isWorkLoad,
              });
            }}
          />
        }
        slotTimeRangeSelector={<DateRangeField />}
        textNumberNoConflicts={numberNoConflicts}
        textNumberHardConflicts={numberHardConflicts}
        textNumberSoftConflicts={numberSoftConflicts}
        textNumberOutsideWorkHours={numberOutsideWorkHours}
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
              <Switch
                size='small'
                checked={filters.isNoConflicts}
                onChange={() => {
                  setFilters({
                    isNoConflicts: !filters.isNoConflicts,
                  });
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
              <Switch
                size='small'
                checked={filters.isSoftConflicts}
                onChange={() => {
                  setFilters({
                    isSoftConflicts: !filters.isSoftConflicts,
                  });
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
              <Switch
                size='small'
                checked={filters.isHardConflicts}
                onChange={() => {
                  setFilters({
                    isHardConflicts: !filters.isHardConflicts,
                  });
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
              <Switch
                size='small'
                checked={filters.isOutSideWorkHours}
                onChange={() => {
                  setFilters({
                    isOutSideWorkHours: !filters.isOutSideWorkHours,
                  });
                }}
              />

              <Typography variant={'body2'}>
                Suggest times over outside work hours
              </Typography>
            </Stack>
          </>
        }
      />
    </Stack>
  );
}

export default StepScheduleFilter;
