/* eslint-disable no-unused-vars */
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { Clock, Edit } from 'lucide-react';
import { type FC, useEffect, useRef, useState } from 'react';

import { SectionCard } from '@/authenticated/components/SectionCard';
import TimezonePicker from '@/components/Common/TimezonePicker';
import { type TimezoneObj } from '@/utils/timeZone';

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
    <SectionCard
      title='Time Zone'
      description='Set the default time zone for your company.'
      isTopActionStick={isPopoverOpen}
      topAction={
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline' size='sm' className=''>
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
              <PopoverClose asChild>
                <Button className='w-full' onClick={handleUpdateAndClose}>
                  Update
                </Button>
              </PopoverClose>
            </div>
          </PopoverContent>
        </Popover>
      }
    >
      <div className='flex items-center space-x-2'>
        <div>
          <p className='text-sm font-medium'>Current Time Zone</p>
          <div className='flex items-center space-x-2'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <p>{timeZone}</p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default TimeZone;
