
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

const CompanyImageSkeleton = () => {
  return (
    <div className='h-48 relative'>
      {/* Cover Image Skeleton */}
      <Skeleton className='absolute inset-0 w-full h-full' />

      {/* Company Logo Skeleton */}
      <div className='absolute -bottom-16 left-8'>
        <div className='w-32 h-32 bg-white rounded-md border border-gray-100 flex items-center justify-center overflow-hidden'>
            <Skeleton className='w-32 h-32 rounded-md' />
          
        </div>
      </div>
    </div>
  );
};

export default CompanyImageSkeleton;
