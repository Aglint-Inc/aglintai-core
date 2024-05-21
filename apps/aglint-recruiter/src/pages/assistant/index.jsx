import React from 'react';

import Assistant from '@/src/components/Assistant';
import Seo from '@/src/components/Common/Seo';
import { JobAssistantProvider } from '@/src/context/JobAssistant';

function AssistantPAge() {
  return (
    <div>
      <JobAssistantProvider>
        <Seo title='Assistant | Aglint AI' />
        <Assistant />
      </JobAssistantProvider>
    </div>
  );
}

export default AssistantPAge;
