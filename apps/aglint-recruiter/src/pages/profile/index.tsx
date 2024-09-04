import { useRouter } from 'next/router';

import ProfileDashboard from '@/components/Profile';
import SeoSettings from '@/components/Profile/SeoSettings';

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
