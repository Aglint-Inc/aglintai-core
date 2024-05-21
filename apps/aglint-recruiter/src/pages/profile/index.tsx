import Seo from '@components/Common/Seo';
import { useRouter } from 'next/router';

import ProfileDashboard from '@/src/components/ProfileDashboard';

const ProfilePage = () => {
  const {
    query: { tab },
  } = useRouter();
  return (
    <>
      {tab === undefined && (
        <Seo
          title={'User Detail - Profile | Aglint AI'}
          description='AI for People Products'
        />
      )}
      {tab === 'user_detail' && (
        <Seo
          title={'User Detail - Profile | Aglint AI'}
          description='AI for People Products'
        />
      )}
      {tab === 'change_email' && (
        <Seo
          title={'Change Email - Profile | Aglint AI'}
          description='AI for People Products'
        />
      )}
      {tab === 'password_update' && (
        <Seo
          title={'Password Update - Profile | Aglint AI'}
          description='AI for People Products'
        />
      )}
      {}
      <ProfileDashboard />
    </>
  );
};

// JobPage.privateProvider = function privateProvider(page) {
//   return <JobApplicationProvider>{page}</JobApplicationProvider>;
// };

export default ProfilePage;
