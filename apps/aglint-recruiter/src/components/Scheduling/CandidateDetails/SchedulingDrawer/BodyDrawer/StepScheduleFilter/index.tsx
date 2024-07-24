import { Checkbox, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { SchedulerFilters } from '@/devlink3/SchedulerFilters';
import { ToggleWithText } from '@/devlink3/ToggleWithText';
import { AntSwitch } from '@/src/components/NewAssessment/AssessmentPage/editor';

import { setFilters, useSchedulingFlowStore } from '../../store';
import DateRangeField from './DateRangeField';
import NoSlotError from './NoSlotError';
import PreferedInterviewers from './PreferedInterviewers';
import { filterSchedulingOptionsArray } from './utils';

function StepScheduleFilter() {
  const { dateRange, schedulingOptions, filters, errorNoSlotFilter } =
    useSchedulingFlowStore((state) => ({
      dateRange: state.dateRange,
      schedulingOptions: state.schedulingOptions,
      filters: state.filters,
      errorNoSlotFilter: state.errorNoSlotFilter,
    }));

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
      {errorNoSlotFilter && <NoSlotError />}

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
        slotNoConflictToggle={
          <ToggleWithText
            slotToggle={
              <AntSwitch
                size='small'
                checked={filters.isNoConflicts}
                onChange={() => {
                  setFilters({
                    isNoConflicts: !filters.isNoConflicts,
                  });
                }}
              />
            }
            textToggleLight={'Show only no conflicts slots'}
          />
        }
        slotSoftConflictToggle={
          <ToggleWithText
            slotToggle={
              <AntSwitch
                size='small'
                checked={filters.isSoftConflicts}
                onChange={() => {
                  setFilters({
                    isSoftConflicts: !filters.isSoftConflicts,
                  });
                }}
              />
            }
            textToggleLight={'Show soft conflict slots'}
          />
        }
        slotHardConflictToggle={
          <ToggleWithText
            slotToggle={
              <AntSwitch
                size='small'
                checked={filters.isHardConflicts}
                onChange={() => {
                  setFilters({
                    isHardConflicts: !filters.isHardConflicts,
                  });
                }}
              />
            }
            textToggleLight={'Show hard conflicts slots'}
          />
        }
        slotOutsideToggle={
          <ToggleWithText
            slotToggle={
              <AntSwitch
                size='small'
                checked={filters.isOutSideWorkHours}
                onChange={() => {
                  setFilters({
                    isOutSideWorkHours: !filters.isOutSideWorkHours,
                  });
                }}
              />
            }
            textToggleLight={'Show out of work hours slots'}
          />
        }
        slotTimeRangeSelector={<DateRangeField />}
        textNumberNoConflicts={numberNoConflicts}
        textNumberHardConflicts={numberHardConflicts}
        textNumberSoftConflicts={numberSoftConflicts}
        textNumberOutsideWorkHours={numberOutsideWorkHours}
        slotPreferedInterviewersSearch={<PreferedInterviewers />}
      />
    </Stack>
  );
}

export default StepScheduleFilter;
