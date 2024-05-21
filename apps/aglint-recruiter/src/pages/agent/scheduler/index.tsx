import React from 'react';

import SchedulerAgent from '@/src/components/Agent/Scheduler';
import Seo from '@/src/components/Common/Seo';

function SchedulerPage() {
  return (
    <div>
      <Seo title='Scheduling agent | Aglint AI' />
      <SchedulerAgent />
    </div>
  );
}

export default SchedulerPage;
