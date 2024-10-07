/* eslint-disable no-unused-vars */
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
import { type ReactNode, useState } from 'react';

import Chip from './Chip';

interface Props {
  btn: ReactNode;
  options: { name: string; id: string }[];
  // eslint-disable-next-line no-unused-vars
  handleAddDepartment: (value: { name: string; id: string }) => void;
  placeholder?: string;
  suggestionsList: {
    name: string;
    id: string;
  }[];
  handleRemoveKeyword: ({
    id,
    name,
  }: {
    id: string | number;
    name: string;
  }) => void;
}

const AddChip: React.FC<Props> = ({
  btn,
  options,
  handleAddDepartment,
  placeholder = 'Enter new value...',
  suggestionsList,
  handleRemoveKeyword,
}) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className='flex flex-wrap items-center gap-2'>
      {options.map((item) => (
        <Chip
          key={item.id}
          name={item.name}
          index={options.indexOf(item)}
          id={item.id}
          handleRemoveKeyword={handleRemoveKeyword}
        />
      ))}
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

              {suggestionsList.length > 0 && !inputValue && (
                <CommandGroup heading='Suggestions'>
                  {suggestionsList.map((item) => (
                    <CommandItem
                      key={item.name}
                      value={item.name}
                      onSelect={() => handleAddDepartment(item)}
                    >
                      <Plus className='mr-2 h-4 w-4' />
                      <span>{item.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {inputValue &&
                !options
                  .map((item) => item.name.toLowerCase())
                  .includes(inputValue.toLowerCase()) && (
                  <CommandGroup heading='Custom'>
                    <CommandItem
                      onSelect={() =>
                        handleAddDepartment({
                          name: inputValue,
                          id: uniqueId(),
                        })
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
    </div>
  );
};

export default AddChip;
