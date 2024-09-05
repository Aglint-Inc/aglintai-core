import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

export function ConfigureCoverImageSkeleton() {
  return (
    <div className='w-full max-w-2xl space-y-4'>
      {/* Title Skeleton */}
      <div className='flex flex-col space-y-2'>
        <Skeleton className='h-6 w-48' /> {/* Title */}
        <Skeleton className='h-4 w-full' /> {/* Description */}
      </div>

      {/* Cover Image Section Skeleton */}
      <div className='flex flex-col items-center justify-center gap-4 w-96 h-48 bg-gray-100 rounded-md overflow-hidden'>
        <Skeleton className='w-full h-full' /> {/* Placeholder for image */}
      </div>

      {/* Edit and Remove Buttons Skeleton */}
      <div className='flex flex-row gap-2'>
        <Skeleton className='h-10 w-40' /> {/* Edit Cover Image */}
        <Skeleton className='h-10 w-40' /> {/* Remove */}
      </div>
    </div>
  );
}

export default ConfigureCoverImageSkeleton;
