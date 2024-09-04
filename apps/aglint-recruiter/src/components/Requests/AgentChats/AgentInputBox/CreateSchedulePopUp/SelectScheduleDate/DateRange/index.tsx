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

interface DateRangeProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (date: [dayjs.Dayjs, dayjs.Dayjs] | null) => void;
  value: { from: dayjs.Dayjs; to?: dayjs.Dayjs } | undefined;
  disablePast?: boolean;
  calendars?: 1 | 2 | 3;
}

function DateRangePicker({
  onChange,
  value,
  disablePast = true,
  calendars = 2,
}: DateRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    value
      ? {
          from: value.from.toDate(),
          to: value.to?.toDate(),
        }
      : undefined,
  );

  React.useEffect(() => {
    if (value) {
      setDate({
        from: value.from.toDate(),
        to: value.to?.toDate(),
      });
    } else {
      setDate(undefined);
    }
  }, [value]);

  return (
    <div className='grid gap-2'>
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
            onSelect={(newDate) => {
              setDate(newDate);
              onChange(
                newDate ? [dayjs(newDate.from), dayjs(newDate.to)] : null,
              );
            }}
            numberOfMonths={calendars}
            disabled={disablePast ? { before: new Date() } : undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangePicker;
