import React from 'react';

import Seo from '@/src/components/Common/Seo';
import JobNewInterviewPlanDashboard from '@/src/components/JobNewInterviewPlan';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const InterviewPlanJobPage = () => {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Jobs`}
        description='AI for People Products'
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
