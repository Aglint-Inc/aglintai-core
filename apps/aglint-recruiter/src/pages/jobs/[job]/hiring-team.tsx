import Layout from 'src/app/(authenticated)/_jobs/[job]/hiring-team/layout';

import Page from '@/components/Jobs/Job/Hiring-Team';

const JobHiringTeamPage = () => {
  return <Page />;
};

JobHiringTeamPage.privateProvider = (page) => <Layout>{page}</Layout>;

export default JobHiringTeamPage;
