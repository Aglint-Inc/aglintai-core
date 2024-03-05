import React from 'react';

import JobInterviewPlan from '@/src/components/JobInterviewPlan/JobInterviewPlan';
import JobInterviewPlanHoc from '@/src/components/JobInterviewPlan/JobInterviewPlanProvider';

const Page = () => {
  return (
    <>
      <JobInterviewPlanHoc>
        <JobInterviewPlan />
      </JobInterviewPlanHoc>
    </>
  );
};

export default Page;
