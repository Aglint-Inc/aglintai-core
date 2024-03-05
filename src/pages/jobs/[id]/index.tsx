import Seo from '@components/Common/Seo';

import { JobAssessmentContextProvider } from '@/src/components/JobAssessment/context';
import JobDashboard from '@/src/components/JobsDashboard/Dashboard';
import JobPostFormProvider from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

const JobPage = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <JobPostFormProvider>
        <JobDashboard />
      </JobPostFormProvider>
    </>
  );
};

JobPage.getProvider = function getProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>
        <JobAssessmentContextProvider>{page}</JobAssessmentContextProvider>
      </JobApplicationProvider>
    </JobDashboardProvider>
  );
};

export default JobPage;
