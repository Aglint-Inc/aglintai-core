import Seo from '@components/Common/Seo';

import JobDashboard from '@/src/components/JobsDashboard/Dashboard';
import { ApplicationProvider } from '@/src/context/ApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const JobPage = () => {
  return (
    <>
      <Seo
        title={`Job Dashboard - Job | Aglint AI`}
        description='AI for People Products'
      />
      <JobDashboard />
    </>
  );
};

JobPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <ApplicationProvider>{page}</ApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default JobPage;
