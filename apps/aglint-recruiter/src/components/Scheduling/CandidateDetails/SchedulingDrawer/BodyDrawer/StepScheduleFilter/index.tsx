import { Checkbox, Stack, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { Text } from '@/devlink/Text';
import { SchedulerConflictCard } from '@/devlink3/SchedulerConflictCard';
import { SchedulerFilters } from '@/devlink3/SchedulerFilters';
import { ToggleWithText } from '@/devlink3/ToggleWithText';
import { AntSwitch } from '@/src/components/NewAssessment/AssessmentPage/editor';

import { useSchedulingApplicationStore } from '../../../store';
import { setFilters, useSchedulingFlowStore } from '../../store';
import DateRangeField from './DateRangeField';
import NoSlotError from './NoSlotError';
import PreferedInterviewers from './PreferedInterviewers';
import { filterSchedulingOptionsArray } from './utils';
export type availabilityType =
  | 'no_conflicts'
  | 'soft_conflicts'
  | 'hard_conflicts'
  | 'outside_work_hours';

function StepScheduleFilter() {
  const { initialSessions, selectedSessionIds } = useSchedulingApplicationStore(
    (state) => ({
      initialSessions: state.initialSessions,
      selectedSessionIds: state.selectedSessionIds,
    }),
  );
  const { dateRange, schedulingOptions, filters, errorNoSlotFilter } =
    useSchedulingFlowStore((state) => ({
      dateRange: state.dateRange,
      schedulingOptions: state.schedulingOptions,
      filters: state.filters,
      errorNoSlotFilter: state.errorNoSlotFilter,
    }));

  const {
    numberHardConflicts: totalNumberHardConflicts,
    numberNoConflicts: totalNumberNoConflicts,
    numberOutsideWorkHours: totalNumberOutsideWorkHours,
    numberSoftConflicts: totalNumberSoftConflicts,
  } = useMemo(
    () =>
      filterSchedulingOptionsArray({
        schedulingOptions,
        filters: {
          isNoConflicts: true,
          isSoftConflicts: true,
          isHardConflicts: true,
          isOutSideWorkHours: true,
          preferredInterviewers: [],
          preferredDateRanges: [],
          isWorkLoad: false,
        },
      }),
    [],
  );

  let availabilityCards = [
    {
      heading: 'No Conflicts',
      title: 'Show only no conflicts slots',
      number: totalNumberNoConflicts,
      color: 'success',
      iconName: 'check_circle',
      disableColor: 'neutral',
      enabled: filters.isNoConflicts,
      availabilityType: 'no_conflicts' as availabilityType,
      toolInfo: 'Enable to show only available slots with no conflicts.',
    },
    {
      heading: 'Soft Conflicts',
      title: 'Show soft conflict slots',
      number: totalNumberSoftConflicts,
      color: 'warning',
      iconName: 'info',
      disableColor: 'neutral',
      enabled: filters.isSoftConflicts,
      availabilityType: 'soft_conflicts' as availabilityType,
      toolInfo:
        'Enable to show slots with soft conflicts which is safe to schedule over.',
    },
    {
      heading: 'Hard Conflicts',
      title: 'Show hard conflicts slots',
      number: totalNumberHardConflicts,
      color: 'error',
      iconName: 'warning',
      disableColor: 'neutral',
      enabled: filters.isHardConflicts,
      availabilityType: 'hard_conflicts' as availabilityType,
      toolInfo:
        'Enable to show slots with hard conflicts which would require you to clear with interviewers.',
    },

    {
      heading: 'Outside Work Hours',
      title: 'Show out of work hours slots',
      number: totalNumberOutsideWorkHours,
      color: 'info',
      iconName: 'dark_mode',
      disableColor: 'neutral',
      enabled: filters.isOutSideWorkHours,
      availabilityType: 'outside_work_hours' as availabilityType,
      toolInfo:
        'Enable to show slots outside of regular work hours, which will be helpful when scheduling over multiple time zones.',
    },
  ];

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.interview_session.id))
    .some((ses) => ses.interview_session.session_type === 'debrief');

  return (
    <Stack height={'calc(100vh - 96px)'}>
      {errorNoSlotFilter && (
        <NoSlotError
          totalNumberHardConflicts={totalNumberHardConflicts}
          totalNumberNoConflicts={totalNumberNoConflicts}
          totalNumberOutsideWorkHours={totalNumberOutsideWorkHours}
          totalNumberSoftConflicts={totalNumberSoftConflicts}
        />
      )}

      <SchedulerFilters
        showWorkloadPreference={!isDebrief}
        textMembers={isDebrief ? 'Sort by Interviewers' : 'Sort by Members'}
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
        slotSchedulerConflictCard={availabilityCards.map(
          (availableData, index) => {
            const {
              color,
              disableColor,
              heading,
              iconName,
              enabled,
              number,
              title,
              availabilityType,
              toolInfo,
            } = availableData;
            return (
              <SchedulerConflictCard
                key={index}
                // isNoConflictActive={enabled}
                slotCountText={
                  <Stack direction={'row'} gap={1} alignItems={'center'}>
                    <Text
                      weight={'medium'}
                      size={6}
                      color={enabled ? color : disableColor}
                      content={number}
                    />
                    <Text
                      color={enabled ? color : disableColor}
                      content={heading}
                    />
                  </Stack>
                }
                slotIcon={
                  <Text
                    color={enabled ? color : disableColor}
                    content={<GlobalIcon size={4} iconName={iconName} />}
                  />
                }
                slotInfoIcon={
                  <Tooltip
                    disableFocusListener
                    disableTouchListener
                    slotProps={{
                      tooltip: {
                        sx: {
                          bgcolor: '#00055',
                          color: 'var(--color-neutral-2)',
                          fontSize: '12px',
                        },
                      },
                    }}
                    title={toolInfo}
                  >
                    <Stack>
                      <GlobalIcon size={4} color={'info'} iconName={'info'} />
                    </Stack>
                  </Tooltip>
                }
                slotToggleWithText={
                  <ToggleWithText
                    slotToggle={
                      <AntSwitch
                        size='small'
                        checked={enabled}
                        onChange={() => {
                          setFilters(
                            availabilityType === 'no_conflicts'
                              ? {
                                  isNoConflicts: !enabled,
                                }
                              : availabilityType === 'soft_conflicts'
                                ? { isSoftConflicts: !enabled }
                                : availabilityType === 'hard_conflicts'
                                  ? { isHardConflicts: !enabled }
                                  : {
                                      isOutSideWorkHours: !enabled,
                                    },
                          );
                        }}
                      />
                    }
                    textToggleLight={title}
                  />
                }
              />
            );
          },
        )}
        slotTimeRangeSelector={<DateRangeField />}
        slotPreferedInterviewersSearch={<PreferedInterviewers />}
      />
    </Stack>
  );
}

export default StepScheduleFilter;
