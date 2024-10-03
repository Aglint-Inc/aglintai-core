'use client';

import { WorkflowsStoreProvider } from '@/workflows/contexts';

import { JobWorkflowDashboard } from './_common/components';

const Page = () => {
  return (
    <>
      <WorkflowsStoreProvider>
        <JobWorkflowDashboard />
      </WorkflowsStoreProvider>
    </>
  );
};

export default Page;
