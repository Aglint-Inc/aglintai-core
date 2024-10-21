import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { toast } from '@components/hooks/use-toast';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';

import { setLocalFilters, useSelfSchedulingFlowStore } from '../../store/store';
import { TimeRangeSelector } from './TimeRangeSelector';

function DateRangeField() {
  const localFilters = useSelfSchedulingFlowStore(
    (state) => state.localFilters,
  );

  const [value, setValue] = React.useState<{
    startTime: Date | null;
    endTime: Date | null;
  } | null>(null);

  return (
    <div className='flex flex-col space-y-2'>
      <span className='text-base font-medium'>Preferred Time Range</span>
      <TimeRangeSelector
        slotButton={
          <UIButton
            variant='default'
            disabled={!value?.startTime || !value?.endTime}
            onClick={() => {
              if (!value) {
                toast({
                  title: 'Choose start time and end time then add',
                });
                return;
              }
              if (
                dayjsLocal(value.startTime).valueOf() >=
                dayjsLocal(value.endTime).valueOf()
              ) {
                toast({
                  title:
                    'Start time End time cannot be same and End time must be greater than start time',
                });
                return;
              }

              if (!value?.startTime || !value?.endTime) return;
              setLocalFilters({
                preferredTimeRanges: [
                  ...localFilters.preferredTimeRanges,
                  {
                    startTime: dayjs(value.startTime)?.toISOString(),
                    endTime: dayjs(value.endTime)?.toISOString(),
                  },
                ],
              });
              setValue(null);
            }}
          >
            Add
          </UIButton>
        }
        slotSelectedTime={
          localFilters.preferredTimeRanges.length > 0 && (
            <div className='flex flex-wrap gap-1'>
              {localFilters.preferredTimeRanges.map((dateRange, index) => {
                return (
                  <Badge
                    key={index}
                    variant='secondary'
                    className='flex items-center gap-1 p-2 text-sm'
                  >
                    {`${dayjs(dateRange.startTime).format('hh:mm A')} - ${dayjs(dateRange.endTime).format('hh:mm A')}`}
                    <Button
                      variant='ghost'
                      size='md'
                      className='h-auto p-0 text-muted-foreground hover:text-foreground'
                      onClick={() => {
                        setLocalFilters({
                          preferredTimeRanges:
                            localFilters.preferredTimeRanges.filter(
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
            <Input
              type='time'
              value={
                value?.startTime ? dayjs(value.startTime).format('HH:mm') : ''
              }
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(':');
                const newDate = dayjs()
                  .hour(parseInt(hours, 10))
                  .minute(parseInt(minutes, 10));
                setValue((prev) => ({
                  startTime: newDate.toDate(),
                  endTime: prev?.endTime ?? null,
                }));
              }}
              className='w-full'
            />
            <Input
              type='time'
              value={value?.endTime ? dayjs(value.endTime).format('HH:mm') : ''}
              onChange={(e) => {
                const [hours, minutes] = e.target.value.split(':');
                const newDate = dayjs()
                  .hour(parseInt(hours, 10))
                  .minute(parseInt(minutes, 10));
                setValue((prev) => ({
                  startTime: prev?.startTime ?? null,
                  endTime: newDate.toDate(),
                }));
              }}
              className='w-full'
            />
          </div>
        }
        textDay={'Day'}
      />
    </div>
  );
}

export default DateRangeField;
