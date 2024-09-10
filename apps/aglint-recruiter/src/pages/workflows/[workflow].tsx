import Layout from 'src/app/(authenticated)/_workflows/[workflow]/layout';
import Page from 'src/app/(authenticated)/_workflows/[workflow]/page';

const Workflow = () => {
  return <Page />;
};

Workflow.privateProvider = (page) => <Layout>{page}</Layout>;

export default Workflow;
