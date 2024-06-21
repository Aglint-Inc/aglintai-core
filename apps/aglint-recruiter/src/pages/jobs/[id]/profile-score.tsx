import Seo from '@components/Common/Seo';

import JobProfileScoreDashboard from '@/src/components/Jobs/Job/Profile-Score';
import { JobProvider } from '@/src/context/JobContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

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
