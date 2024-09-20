'use client';

import { JobWorkflowDashboard } from '@/job/workflows/components';
import { WorkflowsStoreProvider } from '@/job/workflows/contexts';

const Page = () => {
  return (
    <WorkflowsStoreProvider>
      <JobWorkflowDashboard />;
    </WorkflowsStoreProvider>
  );
};

export default Page;
