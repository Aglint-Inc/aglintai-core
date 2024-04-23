import Seo from '@components/Common/Seo';

import JobEditDashboard from '@/src/components/JobEdit';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

const EditJobPage = () => {
  return (
    <>
      <Seo title={`Jobs`} description='AI for People Products' />
      <JobEditDashboard />
    </>
  );
};

EditJobPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>{page}</JobApplicationProvider>
    </JobDashboardProvider>
  );
};

export default EditJobPage;
