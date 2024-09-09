import Seo from '@/components/Common/Seo';
import JobDashboard from '@/components/Jobs/Job/Dashboard';
import JobDashboardProvider from '@/context/JobDashboard';
import { JobProvider } from '@/job/contexts';

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
