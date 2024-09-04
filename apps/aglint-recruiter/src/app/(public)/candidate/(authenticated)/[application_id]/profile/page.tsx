'use client';

import ProfileView from '@/components/CandiatePortal/components/ProfileView';
import { usePortalProfile } from '@/components/CandiatePortal/hook';
import Loader from '@/components/Common/Loader';

export default function ProfilePage({ params }) {
  const application_id = params.application_id;
  const {
    isLoading,
    data,
    refetch: refetchProfile,
  } = usePortalProfile({ application_id });

  if (isLoading) {
    return <Loader />;
  }

  if (data)
    return (
      <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8'>
        <main className='lg:w-[70%] space-y-6 mx-auto mt-8'>
          <ProfileView
            application_id={application_id}
            formData={data}
            refetchProfile={refetchProfile}
          />
        </main>
      </div>
    );
}
