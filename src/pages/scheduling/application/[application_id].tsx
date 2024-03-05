import React from 'react';

import SchedulingApplication from '@/src/components/Scheduling/AllSchedules/SchedulingApplication';
import SchedulingProvider from '@/src/context/SchedulingMain/SchedulingMainProvider';

export default function SchedulingApplicationPage() {
  return (
    <>
      <SchedulingApplication />
    </>
  );
}

SchedulingApplicationPage.getProvider = function getProvider(page) {
  return <SchedulingProvider>{page}</SchedulingProvider>;
};
