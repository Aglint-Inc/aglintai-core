import { useRouter } from 'next/router';

import ProfileDashboard from '@/src/components/ProfileDashboard';
import SeoSettings from '@/src/components/ProfileDashboard/SeoSettings';

const ProfilePage = () => {
  const {
    query: { tab },
  } = useRouter();
  return (
    <>
      <SeoSettings tab={tab} />
      <ProfileDashboard />
    </>
  );
};

// JobPage.privateProvider = function privateProvider(page) {
//   return <JobApplicationProvider>{page}</JobApplicationProvider>;
// };

export default ProfilePage;
