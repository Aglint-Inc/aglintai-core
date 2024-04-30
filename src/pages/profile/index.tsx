import Seo from '@components/Common/Seo';

import ProfileDashboard from '@/src/components/ProfileDashboard';

const ProfilePage = () => {
  return (
    <>
      <Seo
        title={'Profile'}
        description='AI for People Products'
      />
      <ProfileDashboard />
    </>
  );
};

// JobPage.privateProvider = function privateProvider(page) {
//   return <JobApplicationProvider>{page}</JobApplicationProvider>;
// };

export default ProfilePage;
