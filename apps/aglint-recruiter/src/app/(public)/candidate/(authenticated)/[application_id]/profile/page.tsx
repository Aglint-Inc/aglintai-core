'use client';

import ProfileSkeleton from '@/components/CandiatePortal/components/ProfileSkeleton';
import ProfileView from '@/components/CandiatePortal/components/ProfileView';

import { useCandidatePortalProfile } from '../_common/hooks';

export default function ProfilePage() {
  const { data, status } = useCandidatePortalProfile();
  if (status === 'error') return <>Error</>;
  if (status === 'pending')
    return (
      <div className='mt-12'>
        <ProfileSkeleton />
      </div>
    );
  if (!data) return <>Error</>;
  return (
    <div className='container mx-auto max-w-screen-xl flex flex-col lg:flex-row gap-8'>
      <main className='lg:w-[70%] space-y-6 mx-auto mt-8'>
        <ProfileView />
      </main>
    </div>
  );
}
