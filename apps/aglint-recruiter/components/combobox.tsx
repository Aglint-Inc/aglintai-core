'use client';

import { Button } from '@components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
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
import * as React from 'react';

type Props<T> = {
  value: T;
  setValue: (_x: T) => void;
  options: { value: T; label: string }[];
  buttonPlaceholder?: string;
  inputPlaceholder?: string;
};

const Component = <T extends string>(
  {
    buttonPlaceholder = 'Select option',
    inputPlaceholder = 'Search option',
    ...props
  }: Props<T>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          {props.value
            ? props.options.find((framework) => framework.value === props.value)
                ?.label
            : buttonPlaceholder}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[350] p-0'>
        <Command>
          <CommandInput placeholder={inputPlaceholder} />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {props.options.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    props.setValue(
                      (currentValue as T) === props.value
                        ? ('' as T)
                        : (currentValue as T),
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      props.value === framework.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const Combobox = React.memo(
  React.forwardRef<HTMLButtonElement>(Component),
) as typeof Component;

export { Combobox };
