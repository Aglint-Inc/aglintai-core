import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

const AvailabilityCardSkeleton = () => {
  return (
    <Card className='border border-border bg-background/80 shadow-sm backdrop-blur-sm'>
      <CardHeader className='p-0 pb-4 pl-4 pt-4'>
        <h2 className='font-semibold'>
          <Skeleton className='h-6 w-1/2' />
        </h2>
        <p className='text-sm text-gray-600'>
          <Skeleton className='h-4 w-1/3' />
        </p>
      </CardHeader>
      <CardContent className='p-0 pb-4 pl-4 pr-4'>
        <Skeleton className='h-10 w-full' />
      </CardContent>
    </Card>
  );
};

export default AvailabilityCardSkeleton;
