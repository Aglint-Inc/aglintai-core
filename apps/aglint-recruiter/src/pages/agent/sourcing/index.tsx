import React from 'react';

import SourcingAgent from '@/src/components/Agent/Sourcing';
import Seo from '@/src/components/Common/Seo';

function SchedulerPage() {
  return (
    <div>
      <Seo title='Sourcing agent | Aglint AI' />
      <SourcingAgent />
    </div>
  );
}

export default SchedulerPage;
