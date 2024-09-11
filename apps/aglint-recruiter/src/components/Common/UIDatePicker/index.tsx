import { dayjsLocal } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils/shadcn';

export function UIDatePicker({
  value,
  onAccept,
  closeOnSelect,
}: {
  value: Date;
  onAccept: (_value: Date) => void;
  closeOnSelect?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {value ? (
            dayjsLocal(value).format('DD MMM, YYYY')
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={value}
          onSelect={(date: Date) => {
            onAccept(date);
            closeOnSelect && setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
