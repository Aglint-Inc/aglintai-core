import Seo from '@/components/Common/Seo';
import JobProfileScoreDashboard from '@/components/Jobs/Job/Profile-Score';
import JobDashboardProvider from '@/context/JobDashboard';
import { JobProvider } from '@/job/contexts';

const ProfileScoreJobPage = () => {
  return (
    <>
      <Seo
        title={`Profile Score  - Job | Aglint AI`}
        description='AI for People Products'
      />
      <JobProfileScoreDashboard />
    </>
  );
};

ProfileScoreJobPage.privateProvider = function privateProvider(page) {
  return (
    <JobProvider>
      <JobDashboardProvider>{page}</JobDashboardProvider>
    </JobProvider>
  );
};

export default ProfileScoreJobPage;
