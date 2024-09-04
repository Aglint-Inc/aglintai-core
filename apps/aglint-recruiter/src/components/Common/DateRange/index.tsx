'use client';

import { format } from 'date-fns';
import dayjs from 'dayjs';
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
import { cn } from '@/lib/utils';

interface DateRangePickerProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (date: DateRange | undefined) => void;

  value: [dayjs.Dayjs, dayjs.Dayjs] | undefined;
  disablePast?: boolean;
  className?: string;
}

export function DateRangePicker({
  className,
  onChange,
  value,
  disablePast = true,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    value
      ? {
          from: value[0].toDate(),
          to: value[1].toDate(),
        }
      : undefined,
  );

  React.useEffect(() => {
    if (value) {
      setDate({
        from: value[0].toDate(),
        to: value[1].toDate(),
      });
    } else {
      setDate(undefined);
    }
  }, [value]);

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onChange(newDate);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
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
              <span>Pick a date range</span>
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
            disabled={disablePast ? { before: new Date() } : undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangePicker;
