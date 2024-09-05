import Layout from 'src/app/(authenticated)/_jobs/create/layout';
import Page from 'src/app/(authenticated)/_jobs/create/page';

const JobCreate = () => {
  return <Page />;
};

JobCreate.privateProvider = (page) => <Layout>{page}</Layout>;

export default JobCreate;
