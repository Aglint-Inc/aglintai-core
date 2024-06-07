import Seo from '@components/Common/Seo';

import JobHiringTeamDashboard from '@/src/components/JobHiringTeam';
import { ApplicationsProvider } from '@/src/context/ApplicationsContext';
import { JobProvider } from '@/src/context/JobContext';
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
    <JobProvider>
      <JobDashboardProvider>
        <JobInterviewPlanProvider>
          <ApplicationsProvider>{page}</ApplicationsProvider>
        </JobInterviewPlanProvider>
      </JobDashboardProvider>
    </JobProvider>
  );
};

export default JobHiringTeamPage;
