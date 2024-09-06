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
import { Dispatch, FC, SetStateAction, useState, useRef, useEffect } from 'react';

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleUpdateAndClose = async () => {
    await handleUpdate({ break_hour: breaktime });
    setIsOpen(false);
  };

  const handleTogglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Card className='border-none shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 p-0'>
        <CardTitle className='text-lg font-semibold'>Break Time</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <div 
          className='relative border rounded-lg p-4 mt-2 group'
          onMouseLeave={handleMouseLeave}
        >
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant='outline' 
                size='sm' 
                className='absolute top-2 right-2 transition-opacity duration-200 opacity-0 group-hover:opacity-100'
                onClick={handleTogglePopover}
              >
                <Edit className='h-3 w-3' />
                <span className='sr-only'>Edit Break Time</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full' align='start' side='left'>
              <div className='flex flex-col gap-4 w-[300px]'>
                <div>
                  <Label>Break Start Time</Label>
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
                <div>
                  <Label>Break End Time</Label>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default BreakTimeCard;
