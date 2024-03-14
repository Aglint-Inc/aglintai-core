import Seo from '@components/Common/Seo';

import JobEditDashboard from '@/src/components/JobEdit';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

const EditJobPage = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <JobEditDashboard />
    </>
  );
};

EditJobPage.getProvider = function getProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>{page}</JobApplicationProvider>
    </JobDashboardProvider>
  );
};

export default EditJobPage;
