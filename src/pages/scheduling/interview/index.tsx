import React from 'react';

import InterviewComp from '@/src/components/Scheduling/Interview';
import InterviewPanelProvider from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

function InterviewPage() {
  return (
    <>
      <InterviewComp />
    </>
  );
}

InterviewPage.getProvider = function getProvider(page) {
  return <InterviewPanelProvider>{page}</InterviewPanelProvider>;
};

export default InterviewPage;
