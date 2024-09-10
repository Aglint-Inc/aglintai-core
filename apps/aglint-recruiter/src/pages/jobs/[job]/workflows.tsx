import Layout from 'src/app/(authenticated)/_jobs/[job]/workflows/layout';
import Page from 'src/app/(authenticated)/_jobs/[job]/workflows/page';

const JobWorkflowsPage = () => {
  return <Page />;
};

JobWorkflowsPage.privateProvider = (page) => <Layout>{page}</Layout>;

export default JobWorkflowsPage;
