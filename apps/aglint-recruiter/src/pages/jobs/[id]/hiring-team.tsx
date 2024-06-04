import Seo from '@components/Common/Seo';

import JobHiringTeamDashboard from '@/src/components/JobHiringTeam';
import { ApplicationProvider } from '@/src/context/ApplicationsContext';
import JobDashboardProvider from '@/src/context/JobDashboard';
import JobInterviewPlanProvider from '@/src/context/JobInterviewPlanContext';

const JobHiringTeamPage = () => {
  return (
    <>
      <Seo
        title={`Hiring Team - Job | Aglint AI`}
        description='AI for People Products'
      />
      <JobHiringTeamDashboard />
    </>
  );
};

JobHiringTeamPage.privateProvider = (page) => {
  return (
    <JobDashboardProvider>
      <JobInterviewPlanProvider>
        <ApplicationProvider>{page}</ApplicationProvider>
      </JobInterviewPlanProvider>
    </JobDashboardProvider>
  );
};

export default JobHiringTeamPage;
