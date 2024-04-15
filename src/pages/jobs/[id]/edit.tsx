import Seo from '@components/Common/Seo';

import JobEditDashboard from '@/src/components/JobEdit';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

const EditJobPage = () => {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Jobs`}
        description='AI for People Products'
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
