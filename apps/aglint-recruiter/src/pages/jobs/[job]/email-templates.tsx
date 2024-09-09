import Layout from 'src/app/(authenticated)/_jobs/[job]/email-templates/layout';

import Page from '@/components/Jobs/Job/Hiring-Team';

const JobEmailTemplatesPage = () => {
  return <Page />;
};

JobEmailTemplatesPage.privateProvider = (page) => <Layout>{page}</Layout>;

export default JobEmailTemplatesPage;
