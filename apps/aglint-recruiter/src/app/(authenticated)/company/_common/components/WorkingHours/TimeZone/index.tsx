/* eslint-disable no-unused-vars */
import type { SchedulingSettingType } from '@aglint/shared-types';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Clock, Edit } from 'lucide-react';
import { type FC, useEffect, useRef, useState } from 'react';

import TimezonePicker from '@/common/TimezonePicker';
import UISectionCard from '@/common/UISectionCard';
import { type TimezoneObj } from '@/utils/timeZone';

interface TimeZoneProps {
  timeZone: string;
  selectedTimeZone: TimezoneObj | null;
  setSelectedTimeZone: (value: TimezoneObj) => void;
  handleUpdate: (data: Partial<SchedulingSettingType>) => Promise<void>;
}

const TimeZone: FC<TimeZoneProps> = ({
  timeZone,
  selectedTimeZone,
  setSelectedTimeZone,
  handleUpdate,
}) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleUpdateAndClose = async () => {
    // @ts-ignore
    await handleUpdate({ timeZone: selectedTimeZone });
    setIsPopoverOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <UISectionCard
      title='Time Zone'
      description='Set the default time zone for your company.'
      action={
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline' size='sm' className=''>
              <Edit className='mr-2 h-3 w-3' /> Edit
              <span className='sr-only'>Edit Time Zone</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full' align='start' side='left'>
            <div className='flex w-[300px] flex-col gap-4'>
              <Label>Time Zone</Label>
              <TimezonePicker
                value={selectedTimeZone?.tzCode || null}
                onChange={(value) => setSelectedTimeZone(value)}
                width={'300'}
              />
              <Button className='w-full' onClick={handleUpdateAndClose}>
                Update
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      }
    >
      <div className='flex items-center space-x-2'>
        <div>
          <div className='flex items-center space-x-2'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <p>{timeZone}</p>
          </div>
        </div>
      </div>
    </UISectionCard>
  );
};

export default TimeZone;