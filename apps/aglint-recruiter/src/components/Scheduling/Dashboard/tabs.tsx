import { Skeleton } from '@components/ui/skeleton';
import { memo } from 'react';

import { useSchedulingAnalytics } from '@/context/SchedulingAnalytics';

export const Tabs = memo(() => {
  const {
    tabs: { status },
  } = useSchedulingAnalytics();
  if (status === 'error') return <>Error</>;
  if (status === 'pending')
    return (
      <div className='grid grid-cols-5 gap-4'>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className='space-y-2'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>
          ))}
      </div>
    );
  if (status === 'success')
    return (
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5'>
        {[
          'Completed',
          'Waiting',
          'Confirmed',
          'Not Scheduled',
          'Cancelled',
        ].map((title) => (
          <div key={title} className='space-y-2'>
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-6 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        ))}
      </div>
    );
});
Tabs.displayName = 'Tabs';
