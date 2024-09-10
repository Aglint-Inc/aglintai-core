/* eslint-disable no-unused-vars */
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Coffee, Edit, Loader2 } from 'lucide-react';
import {
  type Dispatch,
  type FC,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  isUpdating: boolean;
}

const BreakTimeCard: FC<BreakTimeCardProps> = ({
  breaktime,
  setSelectedHourBreak,
  handleUpdate,
  isUpdating,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateAndClose = async (newBreaktime) => {
    await handleUpdate({ break_hour: newBreaktime });
    setIsOpen(false);
    setSelectedHourBreak(newBreaktime);
  };

  const handleTogglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card>
      <CardHeader className='relative'>
        <CardTitle className='text-lg font-semibold'>Break Time</CardTitle>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='absolute top-2 right-2'
              onClick={handleTogglePopover}
            >
              <Edit className='h-3 w-3' />
              <span className='sr-only'>Edit Break Time</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full' align='start' side='left'>
            <EditBreakTime
              breaktime={breaktime}
              handleUpdateAndClose={handleUpdateAndClose}
              isUpdating={isUpdating}
            />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default BreakTimeCard;

const EditBreakTime = ({
  breaktime,
  handleUpdateAndClose,
  isUpdating,
}: {
  breaktime: BreakTime;
  handleUpdateAndClose: (arg: BreakTime) => void;
  isUpdating: boolean;
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
    <div className='flex flex-col gap-4 w-[300  px]'>
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
      <Button
        onClick={() => {
          if (isStartTimeLessThanEndTime(localBreakTime)) {
            handleUpdateAndClose(localBreakTime);
          }
        }}
        disabled={isUpdating}
      >
        {isUpdating && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        Update
      </Button>
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
