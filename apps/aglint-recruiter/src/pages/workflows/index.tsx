import Layout from 'src/app/(authenticated)/_workflows/layout';
import Page from 'src/app/(authenticated)/_workflows/page';

const Workflows = () => {
  return <Page />;
};

Workflows.privateProvider = (page) => <Layout>{page}</Layout>;

export default Workflows;
