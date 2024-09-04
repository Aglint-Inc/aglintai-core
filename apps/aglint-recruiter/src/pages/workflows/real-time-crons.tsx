import React from 'react';

import RealTimeCrons from '@/components/Workflow/RealTimeCrons';
import WorkflowProvider from '@/context/Workflows/[id]';

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
