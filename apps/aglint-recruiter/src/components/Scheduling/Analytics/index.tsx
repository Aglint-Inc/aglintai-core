import { useSchedulingAnalytics } from '@/src/context/SchedulingAnalytics';
import { Tabs } from './tabs';
import { memo } from 'react';
import Loader from '../../Common/Loader';

export const Analytics = memo(() => {
  const { enabled } = useSchedulingAnalytics();
  if (!enabled)
    return (
      <>
        <Loader />
      </>
    );
  return (
    <>
      <Tabs />
    </>
  );
});
Analytics.displayName = 'Analytics';
