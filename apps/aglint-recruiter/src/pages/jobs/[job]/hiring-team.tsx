import Seo from '@/components/Common/Seo';
import JobHiringTeamDashboard from '@/components/Jobs/Job/Hiring-Team';
import { JobProvider } from '@/job/contexts';

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
