'use client';

import { JobInterviewPlanProvider } from '../interview-plan/_common/contexts';
import { CandidatePlan } from './_common/components';

const Page = () => {
  return (
    <JobInterviewPlanProvider>
      <CandidatePlan />
    </JobInterviewPlanProvider>
  );
};

export default Page;
