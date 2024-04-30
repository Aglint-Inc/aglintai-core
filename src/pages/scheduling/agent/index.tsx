import React from 'react';

import Seo from '@/src/components/Common/Seo';
import SchedulingAgent from '@/src/components/Scheduling/Agent';
import SchedulingAgentProvider from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

function SchedulingAgentPage() {
  return (
    <>
      <Seo
        title={`Agent`}
        description='AI for People Products'
      />
      <SchedulingAgentProvider>
        <SchedulingAgent />
      </SchedulingAgentProvider>
    </>
  );
}

export default SchedulingAgentPage;
