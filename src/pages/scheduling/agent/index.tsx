import React from 'react';

import SchedulingAgent from '@/src/components/Scheduling/Agent';
import SchedulingAgentProvider from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

function SchedulingAgentPage() {
  return (
    <>
      <SchedulingAgentProvider>
        <SchedulingAgent />
      </SchedulingAgentProvider>
    </>
  );
}

export default SchedulingAgentPage;
