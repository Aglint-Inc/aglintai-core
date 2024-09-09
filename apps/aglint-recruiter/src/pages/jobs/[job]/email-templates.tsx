import Layout from 'src/app/(authenticated)/_jobs/[job]/email-templates/layout';
import Page from 'src/app/(authenticated)/_jobs/[job]/email-templates/page';

const JobEmailTemplatesPage = () => {
  return <Page />;
};

JobEmailTemplatesPage.privateProvider = (page) => <Layout>{page}</Layout>;

export default JobEmailTemplatesPage;
