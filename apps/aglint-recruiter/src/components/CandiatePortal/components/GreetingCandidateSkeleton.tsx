import { Card, CardContent } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

const GreetingCandidateSkeleton = () => {
  return (
    <Card className='mt-2 bg-background/80 backdrop-blur-sm shadow-none border border-border'>
      <CardContent className='p-4 flex flex-col gap-1'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-3/4' />
      </CardContent>
    </Card>
  );
};

export default GreetingCandidateSkeleton;
