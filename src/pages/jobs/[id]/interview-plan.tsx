import React from 'react';

import Seo from '@/src/components/Common/Seo';
import JobNewInterviewPlanDashboard from '@/src/components/JobNewInterviewPlan';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const InterviewPlanJobPage = () => {
  return (
    <>
      <Seo
        title='Aglint | Interview Plan'
        description='AI Powered Talent Development Platform.'
      />
      <JobNewInterviewPlanDashboard />
    </>
  );
};
InterviewPlanJobPage.getProvider = function getProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>
        <JobInterviewPlanProvider>{page}</JobInterviewPlanProvider>
      </JobApplicationProvider>
    </JobDashboardProvider>
  );
};

export default InterviewPlanJobPage;
