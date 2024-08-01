import { useRouter } from 'next/router';

import ProfileDashboard from '@/src/components/Profile';
import SeoSettings from '@/src/components/Profile/SeoSettings';

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

export default ProfilePage;
