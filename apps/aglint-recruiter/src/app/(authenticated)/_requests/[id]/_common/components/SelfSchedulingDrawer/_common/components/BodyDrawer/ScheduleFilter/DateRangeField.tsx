import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import dayjs from 'dayjs';
import { ClockIcon, X } from 'lucide-react';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';
import toast from '@/utils/toast';

import {
  setLocalFilters,
  useSelfSchedulingFlowStore,
} from '../../../store/store';
import { TimeRangeSelector } from './TimeRangeSelector';

function DateRangeField() {
  const localFilters = useSelfSchedulingFlowStore(
    (state) => state.localFilters,
  );

  const [value, setValue] = React.useState<{
    startTime: Date;
    endTime: Date;
  }>(null);

  return (
    <div className='flex flex-col space-y-0.5'>
      <span className='text-base font-medium'>Preferred Date Ranges</span>
      <TimeRangeSelector
        slotButton={
          <UIButton
            variant='default'
            disabled={!value?.startTime || !value?.endTime}
            onClick={() => {
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
            }}
          >
            Add
          </UIButton>
        }
        slotSelectedTime={
          localFilters.preferredDateRanges.length > 0 && (
            <div className='flex flex-wrap gap-1'>
              {localFilters.preferredDateRanges.map((dateRange, index) => {
                return (
                  <Badge
                    key={index}
                    variant='secondary'
                    className='flex items-center gap-1'
                  >
                    {`${dayjs(dateRange.startTime).format('hh:mm A')} - ${dayjs(dateRange.endTime).format('hh:mm A')}`}
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-auto p-0 text-muted-foreground hover:text-foreground'
                      onClick={() => {
                        setLocalFilters({
                          preferredDateRanges:
                            localFilters.preferredDateRanges.filter(
                              (range) =>
                                range.startTime !== dateRange.startTime,
                            ),
                        });
                      }}
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  </Badge>
                );
              })}
            </div>
          )
        }
        isMultiDay={false}
        slotTimeinputs={
          <div className='flex flex-row space-x-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='h-9 w-full justify-start px-3 py-2 text-left font-normal'
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
                    className='h-9 w-full justify-start px-3 py-2 text-left font-normal'
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
          </div>
        }
        textDay={'Day'}
      />
    </div>
  );
}

export default DateRangeField;
