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
import { uniqueId } from 'lodash';
import { Plus } from 'lucide-react';
import React, { ReactNode, useState } from 'react';


interface DepartmentsProps {
  btn: ReactNode;
  options: { name: string; id: string }[];
  // eslint-disable-next-line no-unused-vars
  handleAddDepartment: (value: { name: string; id: string }) => void;
  placeholder?: string;
  suggestionsList: {
    name: string;
    id: string;
  }[];
}

const AddChip: React.FC<DepartmentsProps> = ({
  btn,
  options,
  handleAddDepartment,
  placeholder = 'Enter new value...',
  suggestionsList,
}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Popover>
      <PopoverTrigger asChild>{btn}</PopoverTrigger>
      <PopoverContent className='p-0' side='right' align='start'>
        <Command>
          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {suggestionsList.length ? (
              <CommandGroup heading='Suggestions'>
                {options.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => handleAddDepartment(item)}
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    <span>{item.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
            {inputValue &&
              !options
                .map((item) => item.name.toLowerCase())
                .includes(inputValue.toLowerCase()) && (
                <CommandGroup heading='Custom'>
                  <CommandItem
                    onSelect={() =>
                      handleAddDepartment({ name: inputValue, id: uniqueId() })
                    }
                  >
                    <Plus className='mr-2 h-4 w-4' />
                    <span>Add {inputValue}</span>
                  </CommandItem>
                </CommandGroup>
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AddChip;
