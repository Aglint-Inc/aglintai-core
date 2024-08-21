import Stack from '@mui/material/Stack';
import { memo } from 'react';

import { Skeleton } from '@/devlink2/Skeleton';
import { ScheduleCountStats } from '@/devlink3/ScheduleCountStats';
import { useSchedulingAnalytics } from '@/src/context/SchedulingAnalytics';

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
  <Stack
    style={{
      position: 'relative',
      width: '30px',
      height: '36px',
    }}
  >
    <Skeleton />
  </Stack>
);
