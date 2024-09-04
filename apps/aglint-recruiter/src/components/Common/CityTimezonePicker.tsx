'use client';

import cityTimezones from 'city-timezones';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type City = {
  city: string;
  city_ascii: string;
  lat: number;
  lng: number;
  pop: number;
  country: string;
  iso2: string;
  iso3: string;
  province: string;
  timezone: string;
  state_ansi?: string;
};

export default function Component() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>([]);

  const handleSearch = (search: string) => {
    if (search) {
      try {
        const results = cityTimezones.findFromCityStateProvince(search);
        setCities(Array.isArray(results) ? results : []);
      } catch (error) {
        console.error('Error searching cities:', error);
        setCities([]);
      }
    } else {
      setCities([]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[300px] justify-between'
        >
          {value
            ? `${value.city}, ${value.country} (${value.timezone})`
            : 'Select city and timezone...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandInput
            placeholder='Search for a city...'
            onValueChange={handleSearch}
          />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup className='max-h-[300px] overflow-auto'>
            {cities.map((city) => (
              <CommandItem
                key={`${city.city}-${city.country}-${city.lat}-${city.lng}`}
                onSelect={() => {
                  setValue(city);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value?.city === city.city && value?.country === city.country
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
                {city.city}, {city.province ? `${city.province}, ` : ''}
                {city.country} ({city.timezone})
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
