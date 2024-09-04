import { format } from 'date-fns';
import dayjs from 'dayjs';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { cn } from '@/lib/utils';

function DateSelect({
  getDate,
  selectedDates,
}: {
  // eslint-disable-next-line no-unused-vars
  getDate: (date: Date | undefined) => void;
  selectedDates: { date: string }[];
}) {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            getDate(newDate);
          }}
          initialFocus
          disabled={(date) =>
            selectedDates
              .map((item) => item.date)
              .includes(dayjs(date).format('DD MMM YYYY'))
          }
          fromYear={dayjs().year()}
          toYear={dayjs().year()}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DateSelect;

export function DateIcon() {
  return <GlobalIcon iconName='calendar_today' size={5} weight={'regular'} />;
}
