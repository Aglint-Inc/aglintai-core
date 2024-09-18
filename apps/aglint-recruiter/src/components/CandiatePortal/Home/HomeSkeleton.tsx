'use client';

import { Skeleton } from '@components/ui/skeleton';

import InterviewProgressSkeleton from '@/components/CandiatePortal/components/InterviewProgressSkeleton';
import AvailabilityCardSkeleton from '@/components/CandiatePortal/components/RequestAvailabilitySkeleton';
import UpcomingInterviewSkeleton from '@/components/CandiatePortal/components/UpcomingInterviewSkeleton';

import CompanyImageSkeleton from '../components/CompanyImageSkeleton';
import CompanyTabsSkeleton from '../components/CompanyTabsSkeleton';
import GreetingCandidateSkeleton from '../components/GreetingCandidateSkeleton';

export default function HomeSkeleton() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex-1 px-4 py-8'>
        <div className='grid grid-cols-3 gap-8'>
          <div className='col-span-2'>
            {/* leftside skeleton */}
            <div className='overflow-hidden rounded-lg shadow'>
              <CompanyImageSkeleton />

              <div className='p-8 pb-0 pt-20'>
                <Skeleton className='mb-2 h-6 w-40' />
                <Skeleton className='h-4 w-72' />
                <GreetingCandidateSkeleton />
              </div>
              <CompanyTabsSkeleton />
            </div>
          </div>
          {/* rightside skeleton */}
          <div className='flex flex-col gap-4'>
            <UpcomingInterviewSkeleton />
            <AvailabilityCardSkeleton />
            <AvailabilityCardSkeleton />
            <InterviewProgressSkeleton />
          </div>
        </div>
      </main>
    </div>
  );
}
