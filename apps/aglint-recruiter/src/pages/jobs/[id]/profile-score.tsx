import Seo from '@components/Common/Seo';

import JobProfileScoreDashboard from '@/src/components/JobProfileScore';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const ProfileScoreJobPage = () => {
  return (
    <>
      <Seo title={`Jobs`} description='AI for People Products' />
      <JobProfileScoreDashboard />
    </>
  );
};

ProfileScoreJobPage.privateProvider = function privateProvider(page) {
  return (
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <JobApplicationProvider>{page}</JobApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default ProfileScoreJobPage;
