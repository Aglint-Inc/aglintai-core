import { Skeleton } from '@components/ui/skeleton';
import { cn } from '@lib/utils';

function LoaderSlots() {
  return (
    <div className={cn('flex flex-col gap-4 p-4')}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton className='h-10 w-[100%]' key={index} />
      ))}
    </div>
  );
}

export default LoaderSlots;
