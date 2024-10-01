'use client';

import { JobNewInterviewPlanDashboard } from './_common/components';
import { JobInterviewPlanProvider } from './_common/contexts';

const Page = () => {
  return (
    <JobInterviewPlanProvider>
      <JobNewInterviewPlanDashboard />
    </JobInterviewPlanProvider>
  );
};

export default Page;
