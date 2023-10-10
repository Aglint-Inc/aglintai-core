import Seo from '@components/Common/Seo';

import ProfileDashboard from '@/src/components/ProfileDashboard';

const ProfilePage = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <ProfileDashboard />
    </>
  );
};

// JobPage.getProvider = function getProvider(page) {
//   return <JobApplicationProvider>{page}</JobApplicationProvider>;
// };

export default ProfilePage;
