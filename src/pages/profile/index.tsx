import Seo from '@components/Common/Seo';

import ProfileDashboard from '@/src/components/ProfileDashboard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

const ProfilePage = () => {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={recruiter?.name + ' | Profile'}
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
