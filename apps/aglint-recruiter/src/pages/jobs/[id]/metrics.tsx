import Seo from '@/components/Common/Seo';
import JobDashboard from '@/components/Jobs/Job/Dashboard';
import { JobProvider } from '@/context/JobContext';
import JobDashboardProvider from '@/context/JobDashboard';

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
