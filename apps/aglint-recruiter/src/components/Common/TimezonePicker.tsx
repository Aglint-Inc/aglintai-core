/* eslint-disable no-unused-vars */
'use client';

import { Button } from '@components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { cn } from '@lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';

import timeZone from '@/utils/timeZone';
type TimeZoneType = (typeof timeZone)[number];
export function TimezonePicker({
  onChange,
  value,
  width = '280',
}: {
  onChange: (value: TimeZoneType) => void;
  value: TimeZoneType['tzCode'];
  width?: string;
}) {
  const [open, setOpen] = useState(false);
  const selectedTimezone = useMemo(
    // Memoize the selectedTimezone so that it's only recomputed when the value changes.
    () => timeZone.find((tz) => tz.tzCode === value),
    [value],
  );
  const widthSize = `min-w-[${width}px] w-[${width}px]`;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={`w-full justify-between`}
        >
          {selectedTimezone
            ? // If the user has selected a timezone, show its label.
              `${selectedTimezone.label}`
            : // Otherwise, show the placeholder text.
              'Select timezone...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${widthSize} p-0`}>
        <Command>
          <CommandInput placeholder='Search timezone...' />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            {timeZone.map((tz) => (
              <CommandItem
                key={tz.tzCode}
                value={tz.label}
                onSelect={() => {
                  onChange(tz);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === tz.tzCode ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {tz.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default TimezonePicker;
