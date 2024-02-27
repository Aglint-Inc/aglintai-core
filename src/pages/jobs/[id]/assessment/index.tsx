import Seo from '@components/Common/Seo';

import JobAssessmentDashboard from '@/src/components/JobAssessment';
import { JobAssessmentContextProvider } from '@/src/components/JobAssessment/context';
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
      <JobApplicationProvider>
        <JobAssessmentContextProvider>{page}</JobAssessmentContextProvider>
      </JobApplicationProvider>
    </JobDashboardProvider>
  );
};

export default JobAssessmentPage;
