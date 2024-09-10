/* eslint-disable no-unused-vars */
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Clock, Edit, Loader2 } from 'lucide-react';
import { type FC, useEffect, useRef, useState } from 'react';

import TimezonePicker from '@/components/Common/TimezonePicker';

import type { TimezoneObj } from '../Scheduling';

interface TimeZoneProps {
  timeZone: string;
  selectedTimeZone: TimezoneObj | null;
  setSelectedTimeZone: (value: TimezoneObj) => void;
  handleUpdate: (data: {
    timeZone: { tzCode: string } | null;
  }) => Promise<void>;
  isUpdating: boolean;
}

const TimeZone: FC<TimeZoneProps> = ({
  timeZone,
  selectedTimeZone,
  setSelectedTimeZone,
  handleUpdate,
  isUpdating,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleUpdateAndClose = async () => {
    await handleUpdate({ timeZone: selectedTimeZone });
    setIsOpen(false);
  };

  const handleTogglePopover = () => {
    setIsOpen(!isOpen);
  };

  const _handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300); // Delay of 300ms before closing the popover
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader className='relative'>
        <CardTitle className='text-lg font-semibold'>Time Zone</CardTitle>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='absolute top-4 right-4'
              onClick={handleTogglePopover}
            >
              <Edit className='h-3 w-3' />
              <span className='sr-only'>Edit Time Zone</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full' align='start' side='left'>
            <div className='flex flex-col gap-4 w-[300px]'>
              <Label>Time Zone</Label>
              <TimezonePicker
                value={selectedTimeZone?.tzCode}
                onChange={(value) => setSelectedTimeZone(value)}
                width={'300'}
              />
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
        <div className='flex items-center space-x-2'>
          <div>
            <p className='text-sm font-medium'>Current Time Zone</p>
            <div className='flex items-center space-x-2'>
              <Clock className='h-4 w-4 text-muted-foreground' />
              <p>{timeZone}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeZone;
