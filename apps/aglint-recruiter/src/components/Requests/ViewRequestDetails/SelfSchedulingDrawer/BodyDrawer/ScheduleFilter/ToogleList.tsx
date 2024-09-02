import { Grid, Stack } from '@mui/material';
import React, { useMemo } from 'react';

import { Text } from '@/devlink/Text';
import { SchedulerConflictCard } from '@/devlink3/SchedulerConflictCard';
import { ToggleWithText } from '@/devlink3/ToggleWithText';
import { AntSwitch } from '@/src/components/NewAssessment/AssessmentPage/editor';

import { setLocalFilters, useSelfSchedulingFlowStore } from '../../store';
import { filterSchedulingOptionsArray } from './utils';

type AvailabilityType =
  | 'no_conflicts'
  | 'soft_conflicts'
  | 'hard_conflicts'
  | 'outside_work_hours';

function ToogleList() {
  const { schedulingOptions, localFilters } = useSelfSchedulingFlowStore(
    (state) => ({
      schedulingOptions: state.schedulingOptions,
      localFilters: state.localFilters,
    }),
  );

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
    [schedulingOptions],
  );
  let availabilityCards: {
    heading: string;
    title: string;
    number: number;
    color: string;
    disableColor: string;
    enabled: boolean;
    availabilityType: AvailabilityType;
  }[] = [
    {
      heading: 'No Conflicts',
      title: 'Show no conflicts',
      number: totalNumberNoConflicts,
      color: 'success',
      disableColor: 'neutral',
      enabled: localFilters.isNoConflicts,
      availabilityType: 'no_conflicts',
    },
    {
      heading: 'Soft Conflicts',
      title: 'Show soft conflict slots',
      number: totalNumberSoftConflicts,
      color: 'warning',
      disableColor: 'neutral',
      enabled: localFilters.isSoftConflicts,
      availabilityType: 'soft_conflicts',
    },
    {
      heading: 'Hard Conflicts',
      title: 'Show hard conflicts',
      number: totalNumberHardConflicts,
      color: 'error',
      disableColor: 'neutral',
      enabled: localFilters.isHardConflicts,
      availabilityType: 'hard_conflicts',
    },

    {
      heading: 'Outside Work Hours',
      title: 'Show out of work hours',
      number: totalNumberOutsideWorkHours,
      color: 'info',
      disableColor: 'neutral',
      enabled: localFilters.isOutSideWorkHours,
      availabilityType: 'outside_work_hours',
    },
  ];
  return (
    <Stack>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {availabilityCards.map((availableData, index) => {
          const {
            color,
            disableColor,
            heading,
            enabled,
            number,
            title,
            availabilityType,
          } = availableData;
          return (
            <Grid item xs={6} key={index}>
              <SchedulerConflictCard
                key={index}
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
                slotToggleWithText={
                  <ToggleWithText
                    slotToggle={
                      <AntSwitch
                        size='small'
                        checked={enabled}
                        onChange={() => {
                          setLocalFilters({
                            isHardConflicts:
                              availabilityType === 'hard_conflicts'
                                ? !localFilters.isHardConflicts
                                : localFilters.isHardConflicts,
                            isNoConflicts:
                              availabilityType === 'no_conflicts'
                                ? !localFilters.isNoConflicts
                                : localFilters.isNoConflicts,
                            isOutSideWorkHours:
                              availabilityType === 'outside_work_hours'
                                ? !localFilters.isOutSideWorkHours
                                : localFilters.isOutSideWorkHours,
                            isSoftConflicts:
                              availabilityType === 'soft_conflicts'
                                ? !localFilters.isSoftConflicts
                                : localFilters.isSoftConflicts,
                          });
                        }}
                      />
                    }
                    textToggleLight={title}
                  />
                }
              />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default ToogleList;
