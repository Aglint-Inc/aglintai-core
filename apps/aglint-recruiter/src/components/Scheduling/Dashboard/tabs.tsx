import { Skeleton } from '@components/ui/skeleton';
import { ScheduleCountStats } from '@devlink3/ScheduleCountStats';
import { memo } from 'react';

import { useSchedulingAnalytics } from '@/context/SchedulingAnalytics';

export const Tabs = memo(() => {
  const {
    tabs: { data, status },
  } = useSchedulingAnalytics();
  if (status === 'error') return <>Error</>;
  if (status === 'pending')
    return (
      <ScheduleCountStats
        textCancelledCount={<TabSkeleton />}
        textCompletedCount={<TabSkeleton />}
        textConfirmedCount={<TabSkeleton />}
        textNotScheduledCount={<TabSkeleton />}
        textWaitingCount={<TabSkeleton />}
        textIncreasedCancelled={''}
        textIncreasedCompleted={''}
        textIncreasedConfirmed={''}
        textIncreasedNotScheduled={''}
        textIncreasedWaiting={''}
      />
    );
  if (status === 'success')
    return (
      <ScheduleCountStats
        textCancelledCount={data.cancelled ?? '---'}
        textCompletedCount={data.completed ?? '---'}
        textConfirmedCount={data.confirmed ?? '---'}
        textNotScheduledCount={data.not_scheduled ?? '---'}
        textWaitingCount={data.waiting ?? '---'}
        textIncreasedCancelled={''}
        textIncreasedCompleted={''}
        textIncreasedConfirmed={''}
        textIncreasedNotScheduled={''}
        textIncreasedWaiting={''}
      />
    );
});
Tabs.displayName = 'Tabs';

const TabSkeleton = () => (
  <div
    style={{
      position: 'relative',
      width: '30px',
      height: '36px',
    }}
  >
    <Skeleton className='h-full w-full' />
  </div>
);
