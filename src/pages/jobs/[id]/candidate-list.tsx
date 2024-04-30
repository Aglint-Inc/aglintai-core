import Seo from '@components/Common/Seo';

import JobApplicationsDashboard from '@/src/components/JobApplicationsDashboard';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const JobPage = () => {
  return (
    <>
      <Seo title='Jobs' description='AI for People Products' />
      <JobApplicationsDashboard />
    </>
  );
};

JobPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <JobApplicationProvider>{page}</JobApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default JobPage;
