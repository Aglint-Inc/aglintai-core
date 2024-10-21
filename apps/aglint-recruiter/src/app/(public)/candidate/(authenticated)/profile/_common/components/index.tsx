'use client';

import { useCandidatePortalProfile } from '../hooks';
import ProfileSkeleton from './ProfileSkeleton';
import ProfileView from './ProfileView';

export default function ProfilePage() {
  const { isLoading } = useCandidatePortalProfile();
  if (isLoading)
    return (
      <div className='mt-12'>
        <ProfileSkeleton />
      </div>
    );
  return (
    <div className='container mx-auto flex max-w-screen-xl flex-col gap-8 lg:flex-row'>
      <main className='mx-auto mt-8 space-y-6 lg:w-[70%]'>
        <ProfileView />
      </main>
    </div>
  );
}
