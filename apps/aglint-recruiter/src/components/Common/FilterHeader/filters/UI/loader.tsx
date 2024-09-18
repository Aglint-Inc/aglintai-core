import { Skeleton } from '@components/ui/skeleton';
import { memo } from 'react';

const Loader = memo(() => {
  return (
    <div className='min-w-[176px] space-y-2 p-2'>
      {[...Array(5)].map((_, i) => (
        <div key={i} className='h-[20px] w-[200px]'>
          <Skeleton className='h-5 max-w-[200px]' />
        </div>
      ))}
    </div>
  );
});
Loader.displayName = 'Loader';
export default Loader;
