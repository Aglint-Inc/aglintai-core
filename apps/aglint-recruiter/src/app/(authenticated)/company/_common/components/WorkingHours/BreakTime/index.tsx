/* eslint-disable no-unused-vars */
import { toast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { Coffee, Edit } from 'lucide-react';
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { SectionCard } from '@/authenticated/components/SectionCard';
import TimePicker from '@/components/Common/TimePicker';
import dayjs from '@/utils/dayjs';

interface BreakTime {
  start_time: string;
  end_time: string;
}

interface BreakTimeCardProps {
  breaktime: BreakTime;
  setSelectedHourBreak: Dispatch<SetStateAction<BreakTime>>;
  handleUpdate: (data: { break_hour: BreakTime }) => Promise<void>;
}

const BreakTimeCard: FC<BreakTimeCardProps> = ({
  breaktime,
  setSelectedHourBreak,
  handleUpdate,
}) => {
  const handleUpdateAndClose = async (newBreaktime) => {
    await handleUpdate({ break_hour: newBreaktime });
    setSelectedHourBreak(newBreaktime);
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <SectionCard
      title='Break Time'
      description=" Set the default break time for your company's working hours."
      isTopActionStick={isPopoverOpen}
      topAction={
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              onClick={() => {
                setIsPopoverOpen(true);
              }}
            >
              <Edit className='h-3 w-3' />
              <span className='sr-only'>Edit Break Time</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full' align='start' side='left'>
            <EditBreakTime
              breaktime={breaktime}
              handleUpdateAndClose={handleUpdateAndClose}
            />
          </PopoverContent>
        </Popover>
      }
    >
      <div className='flex items-center space-x-2'>
        <div>
          <p className='text-sm font-medium'>Default Break Times</p>
          <div className='flex items-center space-x-2'>
            <Coffee className='h-4 w-4 text-muted-foreground' />
            <p>
              {dayjs()
                .set('hour', parseInt(breaktime?.start_time?.split(':')[0]))
                .set('minute', parseInt(breaktime?.start_time?.split(':')[1]))
                .format('hh:mm A')}
              {' - '}
              {dayjs()
                .set('hour', parseInt(breaktime?.end_time?.split(':')[0]))
                .set('minute', parseInt(breaktime?.end_time?.split(':')[1]))
                .format('hh:mm A')}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default BreakTimeCard;

const EditBreakTime = ({
  breaktime,
  handleUpdateAndClose,
}: {
  breaktime: BreakTime;
  handleUpdateAndClose: (arg: BreakTime) => void;
}) => {
  const [localBreakTime, setLocalBreakTime] = useState<BreakTime>(breaktime);
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
              start_time: dayjs(value).format('HH:mm'),
            }));
          }}
          value={
            new Date(
              dayjs()
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
              end_time: dayjs(value).format('HH:mm'),
            }));
          }}
          value={
            new Date(
              dayjs()
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
      <PopoverClose>
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
      </PopoverClose>
    </div>
  );
};

function isStartTimeLessThanEndTime(breakTime: BreakTime) {
  const { start_time, end_time } = breakTime;
  const start = dayjs()
    .set('hour', parseInt(start_time.split(':')[0]))
    .set('minute', parseInt(start_time.split(':')[1]));
  const end = dayjs()
    .set('hour', parseInt(end_time.split(':')[0]))
    .set('minute', parseInt(end_time.split(':')[1]));

  // Compare if start is before end
  return start.isBefore(end);
}
