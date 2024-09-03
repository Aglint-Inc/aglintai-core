import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface SelectTimeProps {
  i?: number;
  value: Date;
  // eslint-disable-next-line no-unused-vars
  onSelect: (value: Date | undefined, index?: number) => void;
  disable?: boolean;
  minTime?: Date;
  maxTime?: Date;
  width?: string;
  disableIgnoringDatePartForTimeValidation?: boolean;
}

function SelectTime({
  i,
  value,
  onSelect,
  disable = false,
  minTime,
  maxTime,
  width = 'auto',
}: SelectTimeProps) {
  const [open, setOpen] = React.useState(false);

  const handleTimeChange = (newTime: Date | undefined) => {
    if (newTime) {
      const newDate = new Date(value);
      newDate.setHours(newTime.getHours());
      newDate.setMinutes(newTime.getMinutes());
      onSelect(newDate, i);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            `w-${width}`,
          )}
          disabled={disable}
        >
          <ClockIcon className='mr-2 h-4 w-4' />
          {value ? format(value, 'HH:mm') : <span>Pick a time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <div className='p-4'>
          <Input
            type='time'
            value={format(value, 'HH:mm')}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':').map(Number);
              const newDate = new Date(value);
              newDate.setHours(hours);
              newDate.setMinutes(minutes);
              handleTimeChange(newDate);
            }}
            className='w-full'
            disabled={disable}
            min={minTime ? format(minTime, 'HH:mm') : undefined}
            max={maxTime ? format(maxTime, 'HH:mm') : undefined}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SelectTime;

export function ClockIcon(props: React.ComponentProps<typeof Clock>) {
  return <Clock {...props} />;
}
