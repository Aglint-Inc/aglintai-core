import Seo from '@components/Common/Seo';

import JobApplicationsDashboard from '@/src/components/JobApplicationsDashboard';
import { JobAssessmentContextProvider } from '@/src/components/JobAssessment/context';
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
        <JobApplicationsDashboard />
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
