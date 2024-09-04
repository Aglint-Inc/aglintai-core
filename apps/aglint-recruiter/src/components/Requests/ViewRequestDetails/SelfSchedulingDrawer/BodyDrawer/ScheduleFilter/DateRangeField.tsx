import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { Checkbox } from '@/devlink/Checkbox';
import { RolesPill } from '@/devlink/RolesPill';
import { TimeRangeSelector } from '@/devlink3/TimeRangeSelector';
import { ClockIcon } from '@/src/components/CompanyDetailComp/SettingsSchedule/Components/SelectTime';
import toast from '@/src/utils/toast';

import { setLocalFilters, useSelfSchedulingFlowStore } from '../../store';

function DateRangeField() {
  const localFilters = useSelfSchedulingFlowStore(
    (state) => state.localFilters,
  );

  const [value, setValue] = React.useState<{
    startTime: Date;
    endTime: Date;
  }>(null);

  return (
    <Stack spacing={0.5}>
      <Typography variant='body1'>Preferred Date Ranges</Typography>
      <TimeRangeSelector
        slotButton={
          <ButtonSoft
            size={2}
            isDisabled={!value?.startTime || !value?.endTime}
            textButton={'Add'}
            onClickButton={{
              onClick: () => {
                if (!value) {
                  toast.error('Choose start time and end time then add');
                  return;
                }
                if (
                  dayjsLocal(value.startTime).valueOf() >=
                  dayjsLocal(value.endTime).valueOf()
                ) {
                  toast.error(
                    'Start time End time cannot be same and End time must be greater than start time',
                  );
                  return;
                }

                if (!value?.startTime || !value?.endTime) return;
                setLocalFilters({
                  preferredDateRanges: [
                    ...localFilters.preferredDateRanges,
                    {
                      startTime: dayjs(value.startTime)?.toISOString(),
                      endTime: dayjs(value.endTime)?.toISOString(),
                    },
                  ],
                });
                setValue({
                  endTime: null,
                  startTime: null,
                });
              },
            }}
          />
        }
        slotSelectedTime={
          localFilters.preferredDateRanges.length > 0 && (
            <Stack gap={1} direction={'row'} sx={{ flexWrap: 'wrap' }}>
              {localFilters.preferredDateRanges.map((dateRange, index) => {
                return (
                  <RolesPill
                    textRoles={`${dayjs(dateRange.startTime).format('hh:mm A')} - ${dayjs(dateRange.endTime).format('hh:mm A')}`}
                    key={index}
                    onClickRemoveRoles={{
                      onClick: () => {
                        setLocalFilters({
                          preferredDateRanges:
                            localFilters.preferredDateRanges.filter(
                              (range) =>
                                range.startTime !== dateRange.startTime,
                            ),
                        });
                      },
                    }}
                  />
                );
              })}
            </Stack>
          )
        }
        slotCheckbox={<Checkbox />}
        isMultiDay={false}
        slotTimeinputs={
          <Stack direction={'row'} spacing={2}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full justify-start text-left font-normal h-9 px-3 py-2'
                >
                  <ClockIcon className='mr-2 h-4 w-4' />
                  {value?.startTime ? (
                    dayjs(value.startTime).format('hh:mm A')
                  ) : (
                    <span>Pick a start time</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <div className='grid gap-2'>
                  <Input
                    type='time'
                    value={
                      value?.startTime
                        ? dayjs(value.startTime).format('HH:mm')
                        : ''
                    }
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':');
                      const newDate = dayjs()
                        .hour(parseInt(hours, 10))
                        .minute(parseInt(minutes, 10));
                      setValue((prev) => ({
                        startTime: newDate.toDate(),
                        endTime: prev?.endTime,
                      }));
                    }}
                    className='w-full'
                  />
                </div>
              </PopoverContent>
            </Popover>
            <div className='w-full'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-full justify-start text-left font-normal h-9 px-3 py-2'
                  >
                    <ClockIcon className='mr-2 h-4 w-4' />
                    {value?.endTime ? (
                      dayjs(value.endTime).format('hh:mm A')
                    ) : (
                      <span>Pick an end time</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <div className='grid gap-2'>
                    <Input
                      type='time'
                      value={
                        value?.endTime
                          ? dayjs(value.endTime).format('HH:mm')
                          : ''
                      }
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':');
                        const newDate = dayjs()
                          .hour(parseInt(hours, 10))
                          .minute(parseInt(minutes, 10));
                        setValue((prev) => ({
                          startTime: prev?.startTime,
                          endTime: newDate.toDate(),
                        }));
                      }}
                      className='w-full'
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Stack>
        }
        textDay={'Day'}
      />
    </Stack>
  );
}

export default DateRangeField;
