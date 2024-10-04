/* eslint-disable no-unused-vars */
import { dayjsLocal } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Coffee, Edit } from 'lucide-react';
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import TimePicker from '@/components/Common/TimePicker';
import UISectionCard from '@/components/Common/UISectionCard';

interface BreakTime {
  start_time: string;
  end_time: string;
}

interface BreakTimeCardProps {
  breakTime: BreakTime;
  setSelectedHourBreak: Dispatch<SetStateAction<BreakTime | null>>;
  handleUpdate: (data: { break_hour: BreakTime }) => Promise<void>;
}

const BreakTimeCard: FC<BreakTimeCardProps> = ({
  breakTime,
  setSelectedHourBreak,
  handleUpdate,
}) => {
  const handleUpdateAndClose = async (newBreakTime: BreakTime) => {
    await handleUpdate({ break_hour: newBreakTime });
    setSelectedHourBreak(newBreakTime);
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <UISectionCard
      title='Break Time'
      description=" Set the default break time for your company's working hours."
      action={
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              onClick={() => {
                setIsPopoverOpen(true);
              }}
            >
              <Edit className='mr-2 h-3 w-3' /> Edit
              <span className='sr-only'>Edit Break Time</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full' align='start' side='left'>
            <EditBreakTime
              breakTime={breakTime}
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
  handleUpdateAndClose,
}: {
  breakTime: BreakTime;
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
      <Button
        className='w-full'
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
      </Button>
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
