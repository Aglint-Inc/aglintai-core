'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

function SelectScheduleDate({
  scheduleDate,
  onChange,
}: {
  scheduleDate: { start_date: string; end_date: string };
  // eslint-disable-next-line no-unused-vars
  onChange?: (dates: [Date | undefined, Date | undefined]) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: scheduleDate.start_date
      ? new Date(scheduleDate.start_date)
      : undefined,
    to: scheduleDate.end_date ? new Date(scheduleDate.end_date) : undefined,
  });

  React.useEffect(() => {
    setDate({
      from: scheduleDate.start_date
        ? new Date(scheduleDate.start_date)
        : undefined,
      to: scheduleDate.end_date ? new Date(scheduleDate.end_date) : undefined,
    });
  }, [scheduleDate]);

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (onChange) {
      onChange([newDate?.from, newDate?.to]);
    }
  };

  return (
    <div className='grid gap-2'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant='outline'
            className='w-full justify-start text-left font-normal'
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Select Date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SelectScheduleDate;
