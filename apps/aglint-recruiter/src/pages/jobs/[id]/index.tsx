import Seo from '@components/Common/Seo';

import JobDashboard from '@/src/components/Jobs/Job/Dashboard';
import { JobProvider } from '@/src/context/JobContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

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
      <JobDashboardProvider>{page}</JobDashboardProvider>
    </JobProvider>
  );
};

export default JobPage;
