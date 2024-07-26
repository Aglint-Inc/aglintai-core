import React from 'react';

import RealTimeCrons from '@/src/components/Workflow/RealTimeCrons';
import WorkflowsProvider from '@/src/context/Workflows';
import WorkflowProvider from '@/src/context/Workflows/[id]';

const Page = () => {
  return (
    <>
      <RealTimeCrons />
    </>
  );
};

export default Page;

Page.privateProvider = (page) => {
  return (
    <WorkflowsProvider>
      <WorkflowProvider>{page}</WorkflowProvider>
    </WorkflowsProvider>
  );
};
