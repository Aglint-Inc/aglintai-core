import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFieldProps {
  val: string;
  handleSearch: () => Promise<void>;
}

const SearchField = ({ val, handleSearch }: SearchFieldProps) => {
  const [value, setValue] = useState(val);
  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => handleSearch(), 400);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [value, handleSearch]);

  return (
    <div className='relative w-64'>
      <Input
        type='text'
        placeholder='Search'
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
        className='pr-10'
      />
      <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
        {value ? (
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setValue('')}
            className='h-8 w-8'
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
