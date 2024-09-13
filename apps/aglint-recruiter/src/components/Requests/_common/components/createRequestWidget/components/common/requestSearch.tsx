import { Input } from '@components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import {
  type ForwardedRef,
  forwardRef,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';

type Props<T extends string> = {
  search: T;
  setSearch: (_x: T) => void;
  placeholder?: string;
};

const Component = <T extends string>(
  { placeholder = 'Search', ...props }: Props<T>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const [value, setValue] = useState(props.search);
  const initialRef = useRef(true);
  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    const timeout = setTimeout(() => props.setSearch(value), 400);
    return () => clearTimeout(timeout);
  }, [value]);
  return (
    <div className='flex items-center border-b px-3'>
      <SearchIcon className='mr-2 h-4 w-4 shrink-0 opacity-50' />
      <Input
        ref={ref}
        className='flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value as T)}
        style={{
          borderColor: 'transparent',
        }}
      />
    </div>
  );
};

export const RequestSearch = memo(
  forwardRef<HTMLInputElement>(Component),
) as typeof Component;
