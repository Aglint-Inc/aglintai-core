import { Card, CardContent } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

const CompanyTabsSkeleton = () => {
  return (
    <div className='p-8'>
      {/* Tabs List Skeleton */}
      <div className='flex mb-4'>
        <Skeleton className='h-8 w-24 mr-4' />
        <Skeleton className='h-8 w-40' />
      </div>

      {/* About Tab Content Skeleton */}
      <Card className='mb-8 p-0 border-0 shadow-none'>
        <CardContent className='p-0 border-0 shadow-none'>
          <Skeleton className='h-6 w-32 mb-4' />{' '}
          {/* About Us Heading Skeleton */}
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-3/4 mb-4' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-7/12 mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-4/6 mb-4' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-3/4 mb-4' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-3/4 mb-4' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-7/12 mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-4/6 mb-4' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-full mb-2' />
          <Skeleton className='h-4 w-3/4 mb-4' />
          {/* Company Images Slider Skeleton */}
          <Skeleton className='h-48 w-full' />
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyTabsSkeleton;
