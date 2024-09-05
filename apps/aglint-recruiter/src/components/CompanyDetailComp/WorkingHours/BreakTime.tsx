/* eslint-disable no-unused-vars */
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Coffee, Edit, Loader2 } from 'lucide-react';
import { Dispatch, FC, SetStateAction, useState } from 'react';

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

  const handleUpdateAndClose = async () => {
    await handleUpdate({ break_hour: breaktime });
    setIsOpen(false);
  };
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-2xl font-bold'>Break Time</CardTitle>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline'>
              <Edit className='h-4 w-4' />
              <span className='sr-only'>Edit Break Time</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full' side='left' align='start'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center space-x-2'>
                <p>Break Start Time</p>
                <TimePicker
                  onChange={(value) => {
                    setSelectedHourBreak((pre) => ({
                      ...pre,
                      start_time: dayjs(value).format('HH:mm'),
                    }));
                  }}
                  value={
                    new Date(
                      dayjs()
                        .set(
                          'hour',
                          parseInt(breaktime?.start_time?.split(':')[0] || '0'),
                        )
                        .set(
                          'minute',
                          parseInt(breaktime?.start_time?.split(':')[1] || '0'),
                        )
                        .toISOString(),
                    )
                  }
                />
              </div>
              <div className='flex items-center space-x-2'>
                <p>Break End Time</p>
                <TimePicker
                  onChange={(value) => {
                    setSelectedHourBreak((pre) => ({
                      ...pre,
                      end_time: dayjs(value).format('HH:mm'),
                    }));
                  }}
                  value={
                    new Date(
                      dayjs()
                        .set(
                          'hour',
                          parseInt(breaktime?.end_time?.split(':')[0] || '0'),
                        )
                        .set(
                          'minute',
                          parseInt(breaktime?.end_time?.split(':')[1] || '0'),
                        )
                        .toISOString(),
                    )
                  }
                />
              </div>
              <Button onClick={handleUpdateAndClose} disabled={isUpdating}>
                {isUpdating && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Update
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        <div className='flex items-center space-x-4'>
          <Coffee className='h-6 w-6 text-muted-foreground' />
          <div>
            <p className='text-sm font-medium'>Default Break Times</p>
            <p className='text-2xl font-bold'>
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
      </CardContent>
    </Card>
  );
};

export default BreakTimeCard;
