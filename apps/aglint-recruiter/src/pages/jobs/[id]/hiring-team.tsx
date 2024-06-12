import Seo from '@components/Common/Seo';

import JobHiringTeamDashboard from '@/src/components/JobHiringTeam';
import { JobProvider } from '@/src/context/JobContext';

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
  return <JobProvider>{page}</JobProvider>;
};

export default JobHiringTeamPage;
