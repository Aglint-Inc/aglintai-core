import Layout from 'src/app/(authenticated)/_jobs/[job]/profile-score/layout';

import Page from '@/components/Jobs/Job/Profile-Score';

const ProfileScoreJobPage = () => {
  return <Page />;
};

ProfileScoreJobPage.privateProvider = (page) => <Layout>{page}</Layout>;

export default ProfileScoreJobPage;
