import React from 'react';

import Assistant from '@/src/components/Assistant';
import { JobAssistantProvider } from '@/src/context/JobAssistant';

function AssistantPAge() {
  return (
    <div>
      <JobAssistantProvider>
        <Assistant />
      </JobAssistantProvider>
    </div>
  );
}

export default AssistantPAge;
