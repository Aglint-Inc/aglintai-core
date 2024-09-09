import Layout from 'src/app/(authenticated)/_jobs/[job]/metrics/layout';
import Page from 'src/app/(authenticated)/_jobs/[job]/metrics/page';

const JobPage = () => {
  return <Page />;
};

JobPage.privateProvider = (page) => <Layout>{page}</Layout>;

export default JobPage;
