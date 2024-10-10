import React, { useMemo } from 'react';

import { UISwitch } from '@/components/Common/UISwitch';

import { setLocalFilters, useSelfSchedulingFlowStore } from '../../store/store';
import { filterSchedulingOptionsArray } from '../../utils/filterSchedulingOptionsArray';
import { SchedulerConflictCard } from './SchedulerConflictCard';

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
          preferredTimeRanges: [],
          isWorkLoad: false,
        },
      }),
    [schedulingOptions],
  );
  const availabilityCards: {
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
      color: 'green-500',
      disableColor: 'muted-foreground',
      enabled: localFilters.isNoConflicts,
      availabilityType: 'no_conflicts',
    },
    {
      heading: 'Soft Conflicts',
      title: 'Show soft conflict slots',
      number: totalNumberSoftConflicts,
      color: 'blue-500',
      disableColor: 'muted-foreground',
      enabled: localFilters.isSoftConflicts,
      availabilityType: 'soft_conflicts',
    },
    {
      heading: 'Hard Conflicts',
      title: 'Show hard conflicts',
      number: totalNumberHardConflicts,
      color: 'red-500',
      disableColor: 'muted-foreground',
      enabled: localFilters.isHardConflicts,
      availabilityType: 'hard_conflicts',
    },

    {
      heading: 'Outside Work Hours',
      title: 'Show out of work hours',
      number: totalNumberOutsideWorkHours,
      color: 'purple-500',
      disableColor: 'muted-foreground',
      enabled: localFilters.isOutSideWorkHours,
      availabilityType: 'outside_work_hours',
    },
  ];
  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-2 gap-2'>
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
            <div key={index}>
              <SchedulerConflictCard
                key={index}
                slotCountText={
                  <div className='flex items-center space-x-2'>
                    <p
                      className={`font-semibold ${enabled ? `text-${color}` : `text-${disableColor}`}`}
                    >
                      {number}
                    </p>
                    <p className={`text-${enabled ? color : disableColor}`}>
                      {heading}
                    </p>
                  </div>
                }
                slotToggleWithText={
                  <div className='flex items-center space-x-2'>
                    <UISwitch
                      size='sm'
                      checked={enabled}
                      onCheckedChange={() => {
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
                    <p className='text-sm text-muted-foreground'>{title}</p>
                  </div>
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ToogleList;
