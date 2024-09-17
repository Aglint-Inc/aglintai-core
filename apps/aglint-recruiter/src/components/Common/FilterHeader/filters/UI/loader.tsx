import { Skeleton } from '@components/ui/skeleton';
import { memo } from 'react';

const Loader = memo(() => {
  return (
    <div className='space-y-2 p-2 min-w-[176px]'>
      {[...Array(5)].map((_, i) => (
        <div key={i} className='w-[200px] h-[20px]'>
          <Skeleton className=' max-w-[200px] h-5' />
        </div>
      ))}
    </div>
  );
});
Loader.displayName = 'Loader';
export default Loader;
