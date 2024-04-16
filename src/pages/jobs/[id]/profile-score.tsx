import Seo from '@components/Common/Seo';

import JobProfileScoreDashboard from '@/src/components/JobProfileScore';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';

const ProfileScoreJobPage = () => {
  return (
    <>
      <Seo
        title={`Jobs`}
        description='AI for People Products'
      />
      <JobProfileScoreDashboard />
    </>
  );
};

ProfileScoreJobPage.getProvider = function getProvider(page) {
  return (
    <JobDashboardProvider>
      <JobApplicationProvider>{page}</JobApplicationProvider>
    </JobDashboardProvider>
  );
};

export default ProfileScoreJobPage;
