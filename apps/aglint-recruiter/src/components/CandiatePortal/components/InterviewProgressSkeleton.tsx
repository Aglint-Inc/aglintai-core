
import { Card, CardContent } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

const InterviewProgressSkeleton = () => {
  return (
    <div className='w-full max-w-3xl mx-auto flex flex-col gap-4 pb-2'>
      {/* Title Skeleton */}
      <Skeleton className='h-6 w-32' />
      
      {/* Static 3 Card Skeletons */}
      <div className='flex flex-col gap-4'>
        <InterviewProgressCardSkeleton />
        <InterviewProgressCardSkeleton />
        <InterviewProgressCardSkeleton />
      </div>
    </div>
  );
};

const InterviewProgressCardSkeleton = () => {
  return (
    <div className='flex flex-row gap-2'>
      <div
        className='grid gap-2'
        style={{ gridTemplateRows: 'max-content 1fr' }}
      >
        <Skeleton
          className='block mt-2'
          style={{
            borderRadius: '100px',
            height: '10px',
            width: '10px',
          }}
        />
        <Skeleton
          className='mx-auto'
          style={{
            height: '100%',
            width: '1px',
          }}
        />
      </div>
      <Card className='w-full mb-3'>
        <CardContent className='p-4'>
          <div className='space-y-2'>
            <Skeleton className='h-4 w-1/4' />
            <Skeleton className='h-3 w-full' />
            <div className='flex items-center space-x-2'>
              <Skeleton className='h-6 w-16' />
              <Skeleton className='h-4 w-32' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewProgressSkeleton;
