import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { cn } from '@lib/utils';
import dayjs from 'dayjs';
import { CalendarIcon, ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react';
import React, { useState } from 'react';

import DateRange from '../DateRange';
import { ShowCode } from '../ShowCode';

export type DateRangeSelectorType = {
  name: string;
  values: string[];
  // eslint-disable-next-line no-unused-vars
  setValue: (x: dayjs.Dayjs[]) => void;
  disablePast?: boolean;
};

function DateRangeSelector({
  name,
  setValue,
  values,
  disablePast = true,
}: DateRangeSelectorType) {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs[]>([]);
  const [rangeActive, setRangeActive] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !selectedDate.length && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {name}
          {selectedDate.length > 0 && (
            <span className='ml-auto h-2 w-2 rounded-full bg-sky-500' />
          )}
          {open ? (
            <ChevronUp className='ml-auto h-4 w-4' />
          ) : (
            <ChevronDown className='ml-auto h-4 w-4' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <div className='flex flex-col space-y-4 p-4'>
          <div className='flex space-x-4'>
            <Button
              variant={rangeActive ? 'default' : 'outline'}
              onClick={() => setRangeActive(true)}
            >
              Date Range
            </Button>
            <Button
              variant={!rangeActive ? 'default' : 'outline'}
              onClick={() => setRangeActive(false)}
            >
              Specific Date
            </Button>
          </div>
          <ShowCode>
            <ShowCode.When isTrue={rangeActive}>
              <DateRange
                onChange={(e) => {
                  if (e.to) {
                    setSelectedDate([dayjs(e.from), dayjs(e.to)]);
                  }
                }}
                value={[
                  dayjs(values[0]).isValid() ? dayjs(values[0]) : undefined,
                  dayjs(values[1]).isValid() ? dayjs(values[1]) : undefined,
                ]}
              />
            </ShowCode.When>
            <ShowCode.Else>
              <Calendar
                mode='single'
                selected={selectedDate[0]?.toDate()}
                onSelect={(date) => setSelectedDate([dayjs(date)])}
                disabled={(date) =>
                  disablePast &&
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </ShowCode.Else>
          </ShowCode>
          <div className='flex items-center justify-between'>
            <Button
              variant='ghost'
              onClick={() => {
                setSelectedDate([]);
                setValue([]);
                setOpen(false);
              }}
            >
              <RefreshCcw className='mr-2 h-4 w-4' />
              Reset
            </Button>
            <div className='space-x-2'>
              <Button
                variant='outline'
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setValue(selectedDate);
                  setOpen(false);
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default DateRangeSelector;
