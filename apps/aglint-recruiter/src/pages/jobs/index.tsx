import Layout from 'src/app/(authenticated)/_jobs/layout';
import Page from 'src/app/(authenticated)/_jobs/page';

const Jobs = () => {
  return <Page />;
};

Jobs.privateProvider = (page) => <Layout>{page}</Layout>;

export default Jobs;
