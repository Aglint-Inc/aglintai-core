import { Checkbox, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { SchedulerFilters } from '@/devlink3/SchedulerFilters';

import { setFilters, useSchedulingFlowStore } from '../store';
import DateRangeField from './DateRangeField';
import PreferedInterviewers from './PreferedInterviewers';
import SuggesttionToggle from './SuggesttionToggle';
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
        slotSuggestionControlTooltip={<SuggesttionToggle />}
      />
    </Stack>
  );
}

export default StepScheduleFilter;
