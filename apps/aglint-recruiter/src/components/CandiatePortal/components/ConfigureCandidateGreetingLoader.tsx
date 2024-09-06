import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

const ConfigureCandidateGreetingLoader = () => {
  return (
    <div className='w-full max-w-2xl space-y-4'>
      {/* Title and Description Skeleton */}
      <div className='flex flex-col space-y-2'>
        <Skeleton className='h-6 w-48' /> {/* Title */}
        <Skeleton className='h-4 w-full' /> {/* Description */}
      </div>

      {/* Greeting Content Skeleton */}
      <Skeleton className='h-32 w-full rounded-md border bg-gray-100' />

      {/* Button Skeleton */}
      <Skeleton className='h-10 w-40 mt-4' />
    </div>
  );
};

export default ConfigureCandidateGreetingLoader;
