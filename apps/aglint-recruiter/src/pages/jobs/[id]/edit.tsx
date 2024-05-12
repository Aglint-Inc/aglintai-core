import Seo from '@components/Common/Seo';

import JobEditDashboard from '@/src/components/JobEdit';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

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
      <JobInterviewPlanProvider>
        <JobApplicationProvider>{page}</JobApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default EditJobPage;
