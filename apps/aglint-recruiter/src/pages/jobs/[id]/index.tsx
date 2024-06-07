import Seo from '@components/Common/Seo';

import JobDashboard from '@/src/components/JobsDashboard/Dashboard';
import { ApplicationsProvider } from '@/src/context/ApplicationsContext';
import { JobProvider } from '@/src/context/JobContext';
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
    <JobProvider>
      <JobDashboardProvider>
        <JobInterviewPlanProvider>
          <ApplicationsProvider>{page}</ApplicationsProvider>
        </JobInterviewPlanProvider>
      </JobDashboardProvider>
    </JobProvider>
  );
};

export default JobPage;
