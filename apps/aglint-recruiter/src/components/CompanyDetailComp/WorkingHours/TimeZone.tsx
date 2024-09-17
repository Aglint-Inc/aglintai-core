/* eslint-disable no-unused-vars */
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
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
}

const TimeZone: FC<TimeZoneProps> = ({
  timeZone,
  selectedTimeZone,
  setSelectedTimeZone,
  handleUpdate,
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleUpdateAndClose = async () => {
    await handleUpdate({ timeZone: selectedTimeZone });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Card className='group relative'>
      <CardHeader className='relative'>
        <CardTitle className='text-lg font-semibold'>Time Zone</CardTitle>
        <CardDescription className='text-sm text-gray-500'>
          Set the default time zone for your company.
        </CardDescription>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='absolute right-2 top-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100'
            >
              <Edit className='h-3 w-3' />
              <span className='sr-only'>Edit Time Zone</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full' align='start' side='left'>
            <div className='flex w-[300px] flex-col gap-4'>
              <Label>Time Zone</Label>
              <TimezonePicker
                value={selectedTimeZone?.tzCode}
                onChange={(value) => setSelectedTimeZone(value)}
                width={'300'}
              />
              <PopoverClose>
                <Button className='w-full' onClick={handleUpdateAndClose}>
                  Update
                </Button>
              </PopoverClose>
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
