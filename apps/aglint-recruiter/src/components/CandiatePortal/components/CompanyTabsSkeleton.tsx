import { Card, CardContent } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

const CompanyTabsSkeleton = () => {
  return (
    <div className='p-8'>
      {/* Tabs List Skeleton */}
      <div className='mb-4 flex'>
        <Skeleton className='mr-4 h-8 w-24' />
        <Skeleton className='h-8 w-40' />
      </div>

      {/* About Tab Content Skeleton */}
      <Card className='mb-8 border-0 p-0 shadow-none'>
        <CardContent className='border-0 p-0 shadow-none'>
          <Skeleton className='mb-4 h-6 w-32' />{' '}
          {/* About Us Heading Skeleton */}
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-4 h-4 w-3/4' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-2 h-4 w-7/12' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-4 h-4 w-4/6' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-4 h-4 w-3/4' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-4 h-4 w-3/4' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-2 h-4 w-7/12' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-4 h-4 w-4/6' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-2 h-4 w-full' />
          <Skeleton className='mb-4 h-4 w-3/4' />
          {/* Company Images Slider Skeleton */}
          <Skeleton className='h-48 w-full' />
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyTabsSkeleton;
