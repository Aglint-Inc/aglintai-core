import { Card, CardContent } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

const GreetingCandidateSkeleton = () => {
  return (
    <Card className='mt-2 border border-border bg-background/80 shadow-none backdrop-blur-sm'>
      <CardContent className='flex flex-col gap-1 p-4'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
      </CardContent>
    </Card>
  );
};

export default GreetingCandidateSkeleton;
