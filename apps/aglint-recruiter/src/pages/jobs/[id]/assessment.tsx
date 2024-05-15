import Seo from '@components/Common/Seo';

import JobAssessmentDashboard from '@/src/components/JobAssessment';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const JobAssessmentPage = () => {
  return (
    <>
      <Seo title={`Jobs`} description='AI for People Products' />
      <JobAssessmentDashboard />
    </>
  );
};

JobAssessmentPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <JobApplicationProvider>{page}</JobApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default JobAssessmentPage;
