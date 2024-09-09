import Layout from 'src/app/(authenticated)/_jobs/[job]/profile-score/layout';
import Page from 'src/app/(authenticated)/_jobs/[job]/profile-score/page';

const ProfileScoreJobPage = () => {
  return <Page />;
};

ProfileScoreJobPage.privateProvider = (page) => <Layout>{page}</Layout>;

export default ProfileScoreJobPage;
