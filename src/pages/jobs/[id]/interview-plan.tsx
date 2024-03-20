import React from 'react';

import Seo from '@/src/components/Common/Seo';
import JobInterviewPlan from '@/src/components/JobInterviewPlan/JobInterviewPlan';
import JobInterviewPlanHoc from '@/src/components/JobInterviewPlan/JobInterviewPlanProvider';

const Page = () => {
  return (
    <>
      <Seo
        title='Aglint | Interview Plan'
        description='AI Powered Talent Development Platform.'
      />
      <JobInterviewPlanHoc>
        <JobInterviewPlan />
      </JobInterviewPlanHoc>
    </>
  );
};

export default Page;
