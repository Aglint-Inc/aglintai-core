import { Search, X } from 'lucide-react';
import React, { ChangeEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFieldProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  isFullWidth?: boolean;
}

const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  onClear,
  onFocus,
  onBlur,
  placeholder = '',
  isFullWidth = false,
}) => {
  return (
    <div className={`relative ${isFullWidth ? 'w-full' : 'w-[250px]'}`}>
      <Input
        type='text'
        className='pr-10'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
        {value ? (
          <Button
            variant='ghost'
            size='icon'
            onClick={onClear}
            className='h-8 w-8 hover:bg-neutral-200'
          >
            <X className='h-4 w-4' />
          </Button>
        ) : (
          <Search className='h-4 w-4 text-gray-400' />
        )}
      </div>
    </div>
  );
};

export default SearchField;
