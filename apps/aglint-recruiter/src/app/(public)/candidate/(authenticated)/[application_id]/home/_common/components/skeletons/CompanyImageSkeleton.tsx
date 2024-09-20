import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

const CompanyImageSkeleton = () => {
  return (
    <div className='relative h-48'>
      {/* Cover Image Skeleton */}
      <Skeleton className='absolute inset-0 h-full w-full' />

      {/* Company Logo Skeleton */}
      <div className='absolute -bottom-16 left-8'>
        <div className='flex h-32 w-32 items-center justify-center overflow-hidden rounded-md border border-gray-100 bg-white'>
          <Skeleton className='h-32 w-32 rounded-md' />
        </div>
      </div>
    </div>
  );
};

export default CompanyImageSkeleton;
