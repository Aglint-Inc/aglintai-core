import Seo from '@components/Common/Seo';

import JobProfileScoreDashboard from '@/src/components/JobProfileScore';
import { ApplicationProvider } from '@/src/context/ApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

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
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <ApplicationProvider>{page}</ApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default ProfileScoreJobPage;
