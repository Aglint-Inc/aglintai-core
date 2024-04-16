import Seo from '@components/Common/Seo';

import ProfileDashboard from '@/src/components/ProfileDashboard';

const ProfilePage = () => {
  return (
    <>
      <Seo
        title={'Profile'}
        description='Explore exciting career opportunities and find your perfect job match on our job listing page'
      />
      <ProfileDashboard />
    </>
  );
};

// JobPage.getProvider = function getProvider(page) {
//   return <JobApplicationProvider>{page}</JobApplicationProvider>;
// };

export default ProfilePage;
