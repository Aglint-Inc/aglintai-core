/* eslint-disable no-unused-vars */
import { type CustomSchedulingSettings } from '@aglint/shared-types/src/db/tables/common.types';
import { dayjsLocal } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Coffee, Pen } from 'lucide-react';
import { type FC, useEffect, useRef, useState } from 'react';

import TimePicker from '@/common/TimePicker';
import { UIButton } from '@/common/UIButton';
import UISectionCard from '@/common/UISectionCard';

type BreakTime = CustomSchedulingSettings['break_hour'];
interface BreakTimeCardProps {
  breakTime: BreakTime;
  handleUpdate: (data: { break_hour: BreakTime }) => Promise<void>;
  isUpdating: boolean;
}

const BreakTimeCard: FC<BreakTimeCardProps> = ({
  breakTime,
  handleUpdate,
  isUpdating,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleUpdateAndClose = async (newBreakTime: BreakTime) => {
    await handleUpdate({ break_hour: newBreakTime });
    setIsPopoverOpen(false);
  };

  return (
    <UISectionCard
      title='Break Time'
      description=" Set the default break time for your company's working hours."
      isHoverEffect={!isPopoverOpen}
      action={
        <Popover
          open={isPopoverOpen}
          onOpenChange={() => {
            if (!isUpdating && isPopoverOpen) setIsPopoverOpen(false);
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='hover:bg-background/50'
              onClick={() => {
                if (!isUpdating) setIsPopoverOpen(true);
              }}
            >
              <Pen className='mr-2 h-3 w-3' /> Edit
              <span className='sr-only'>Edit Break Time</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full' align='start' side='left'>
            <EditBreakTime
              breakTime={breakTime}
              isUpdating={isUpdating}
              handleUpdateAndClose={handleUpdateAndClose}
            />
          </PopoverContent>
        </Popover>
      }
    >
      <div className='flex items-center space-x-2'>
        <div>
          <div className='flex items-center space-x-2'>
            <Coffee className='h-4 w-4 text-muted-foreground' />
            <p>
              {dayjsLocal()
                .set('hour', parseInt(breakTime?.start_time?.split(':')[0]))
                .set('minute', parseInt(breakTime?.start_time?.split(':')[1]))
                .format('hh:mm A')}
              {' - '}
              {dayjsLocal()
                .set('hour', parseInt(breakTime?.end_time?.split(':')[0]))
                .set('minute', parseInt(breakTime?.end_time?.split(':')[1]))
                .format('hh:mm A')}
            </p>
          </div>
        </div>
      </div>
    </UISectionCard>
  );
};

export default BreakTimeCard;

const EditBreakTime = ({
  breakTime,
  isUpdating,
  handleUpdateAndClose,
}: {
  breakTime: BreakTime;
  isUpdating: boolean;
  handleUpdateAndClose: (arg: BreakTime) => void;
}) => {
  const [localBreakTime, setLocalBreakTime] = useState<BreakTime>(breakTime);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className='w-[300 px] flex flex-col gap-4'>
      <div>
        <Label>Break Start Time</Label>
        <TimePicker
          onChange={(value) => {
            setLocalBreakTime((pre) => ({
              ...pre,
              start_time: dayjsLocal(value).format('HH:mm'),
            }));
          }}
          value={
            new Date(
              dayjsLocal()
                .set(
                  'hour',
                  parseInt(localBreakTime?.start_time?.split(':')[0] || '0'),
                )
                .set(
                  'minute',
                  parseInt(localBreakTime?.start_time?.split(':')[1] || '0'),
                )
                .toISOString(),
            )
          }
        />
      </div>
      <div>
        <Label>Break End Time</Label>
        <TimePicker
          onChange={(value) => {
            setLocalBreakTime((pre) => ({
              ...pre,
              end_time: dayjsLocal(value).format('HH:mm'),
            }));
          }}
          value={
            new Date(
              dayjsLocal()
                .set(
                  'hour',
                  parseInt(localBreakTime?.end_time?.split(':')[0] || '0'),
                )
                .set(
                  'minute',
                  parseInt(localBreakTime?.end_time?.split(':')[1] || '0'),
                )
                .toISOString(),
            )
          }
        />
      </div>
      <UIButton
        className='w-full'
        isLoading={isUpdating}
        onClick={async () => {
          if (isStartTimeLessThanEndTime(localBreakTime)) {
            await handleUpdateAndClose(localBreakTime);
          } else {
            toast({
              variant: 'destructive',
              title: 'End time must greater than start time',
            });
          }
        }}
      >
        Update
      </UIButton>
    </div>
  );
};

function isStartTimeLessThanEndTime(breakTime: BreakTime) {
  const { start_time, end_time } = breakTime;
  const start = dayjsLocal()
    .set('hour', parseInt(start_time.split(':')[0]))
    .set('minute', parseInt(start_time.split(':')[1]));
  const end = dayjsLocal()
    .set('hour', parseInt(end_time.split(':')[0]))
    .set('minute', parseInt(end_time.split(':')[1]));

  // Compare if start is before end
  return start.isBefore(end);
}
