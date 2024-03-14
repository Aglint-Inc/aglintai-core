import Seo from '@components/Common/Seo';

import JobAssessmentDashboard from '@/src/components/JobAssessment';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

const JobAssessmentPage = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <JobAssessmentDashboard />
    </>
  );
};

JobAssessmentPage.getProvider = function getProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>{page}</JobApplicationProvider>
    </JobDashboardProvider>
  );
};

export default JobAssessmentPage;
