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
import { FC, useState } from 'react';

import TimezonePicker from '@/components/Common/TimezonePicker';

import { TimezoneObj } from '../Scheduling';

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

  const handleUpdateAndClose = async () => {
    await handleUpdate({ timeZone: selectedTimeZone });
    setIsOpen(false);
  };
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-2xl font-bold'>Time Zone</CardTitle>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline'>
              <Edit className='h-4 w-4' />
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
        <div className='flex items-center space-x-4'>
          <Clock className='h-6 w-6 text-muted-foreground' />
          <div>
            <p className='text-sm font-medium'>Current Time Zone</p>
            <p className='text-2xl font-bold'>{timeZone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeZone;
