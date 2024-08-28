import React from 'react';

import RealTimeCrons from '@/src/components/Workflow/RealTimeCrons';
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
  return <WorkflowProvider>{page}</WorkflowProvider>;
};
