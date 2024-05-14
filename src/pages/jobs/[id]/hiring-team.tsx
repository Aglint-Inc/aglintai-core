import Seo from '@components/Common/Seo';

import JobHiringTeamDashboard from '@/src/components/JobHiringTeam';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const JobHiringTeamPage = () => {
  return (
    <>
      <Seo title={`Jobs`} description='AI for People Products' />
      <JobHiringTeamDashboard />
    </>
  );
};

JobHiringTeamPage.privateProvider = (page) => {
  return (
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <JobApplicationProvider>{page}</JobApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default JobHiringTeamPage;
