import React from 'react';

import SchedulingMainComp from '@/src/components/Scheduling';
import InterviewPanelProvider from '@/src/context/InterviewPanel/InterviewPanelProvider';

function SchedulingMainPage() {
  return (
    <>
      <SchedulingMainComp />
    </>
  );
}

SchedulingMainPage.getProvider = function getProvider(page) {
  return <InterviewPanelProvider>{page}</InterviewPanelProvider>;
};

export default SchedulingMainPage;
