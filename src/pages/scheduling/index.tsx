import React from 'react';

import ShecdulingMainComp from '@/src/components/Scheduling';
import InterviewPanelProvider from '@/src/context/InterviewPanel/InterviewPanelProvider';

function SchedulingMainPage() {
  return (
    <>
      <ShecdulingMainComp />
    </>
  );
}

SchedulingMainPage.getProvider = function getProvider(page) {
  return <InterviewPanelProvider>{page}</InterviewPanelProvider>;
};

export default SchedulingMainPage;
