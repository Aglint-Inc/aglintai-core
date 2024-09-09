import Layout from 'src/app/(authenticated)/_jobs/[job]/layout';
import Page from 'src/app/(authenticated)/_jobs/[job]/page';

const Job = () => {
  return <Page />;
};

Job.privateProvider = (page) => <Layout>{page}</Layout>;

export default Job;
