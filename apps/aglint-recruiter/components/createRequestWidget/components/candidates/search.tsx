import {
  useCreateRequest,
  useCreateRequestActions,
} from '@components/createRequestWidget/hooks';
import { Input } from '@components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const Search = () => {
  const search = useCreateRequest((state) => state.payloads.candidates.search);
  const { setCandidateSearch } = useCreateRequestActions();
  const [value, setValue] = useState(search);
  const initialRef = useRef(true);
  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    const timeout = setTimeout(() => setCandidateSearch(value), 400);
    return () => clearTimeout(timeout);
  }, [value]);
  return (
    <div className='flex items-center border-b px-3'>
      <SearchIcon className='mr-2 h-4 w-4 shrink-0 opacity-50' />
      <Input
        className='flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
        placeholder='Which candidate?'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          borderColor: 'transparent',
        }}
      />
    </div>
  );
};
