import Layout from 'src/app/(authenticated)/_jobs/[job]/job-details/layout';

import Page from '@/components/Jobs/Job/Job-Details';

const JobDetailsPage = () => {
  return <Page />;
};

JobDetailsPage.privateProvider = (page) => <Layout>{page}</Layout>;

export default JobDetailsPage;
