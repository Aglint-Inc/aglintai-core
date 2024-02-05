import Seo from '@components/Common/Seo';

import JobDashboard from '@/src/components/JobsDashboard/Dashboard';
import JobPostFormProvider from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import { JobAssistantProvider } from '@/src/context/JobAssistant';

const JobPage = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <JobPostFormProvider>
        <JobAssistantProvider>
          <JobDashboard />
        </JobAssistantProvider>
      </JobPostFormProvider>
    </>
  );
};

JobPage.getProvider = function getProvider(page) {
  return <JobApplicationProvider>{page}</JobApplicationProvider>;
};

export default JobPage;
