import Seo from '@components/Common/Seo';

import JobDashboard from '@/src/components/JobsDashboard/Dashboard';
import JobPostFormProvider from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

const JobPage = () => {
  return (
    <>
      <Seo title={`Jobs`} description='AI for People Products' />
      <JobPostFormProvider>
        <JobDashboard />
      </JobPostFormProvider>
    </>
  );
};

JobPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>{page}</JobApplicationProvider>
    </JobDashboardProvider>
  );
};

export default JobPage;
