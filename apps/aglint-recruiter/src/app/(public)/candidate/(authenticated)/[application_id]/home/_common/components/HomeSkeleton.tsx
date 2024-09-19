'use client';

import { Skeleton } from '@components/ui/skeleton';

import CompanyImageSkeleton from './skeletons/CompanyImageSkeleton';
import CompanyTabsSkeleton from './skeletons/CompanyTabsSkeleton';
import GreetingCandidateSkeleton from './skeletons/GreetingCandidateSkeleton';
import InterviewProgressSkeleton from './skeletons/InterviewProgressSkeleton';
import AvailabilityCardSkeleton from './skeletons/RequestAvailabilitySkeleton';
import UpcomingInterviewSkeleton from './skeletons/UpcomingInterviewSkeleton';

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
