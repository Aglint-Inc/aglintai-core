'use client';

import ProfileSkeleton from '@/components/CandiatePortal/components/ProfileSkeleton';
import ProfileView from '@/components/CandiatePortal/components/ProfileView';
import { usePortalProfile } from '@/components/CandiatePortal/hook';

export default function ProfilePage({ params }) {
  const application_id = params.application_id;
  const {
    isLoading,
    data,
    refetch: refetchProfile,
  } = usePortalProfile({ application_id });

  if (isLoading) {
    return (
      <div className='mt-12'>
        <ProfileSkeleton />
      </div>
    );
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
