import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

import { useCandidateExp } from '../../hook/job/jobMatrix';

export default function AverageTenure() {
  const { data, isFetching } = useCandidateExp();
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-md font-semibold'>Average Tenure</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <div className='mb-2 text-6xl font-bold'>
          {isFetching ? (
            <Skeleton className='h-[60px] w-[100px]' />
          ) : (
            data.avg_tenure
          )}
        </div>
        <div className='mb-4 text-2xl font-semibold'>Years</div>
        <p className='text-center text-muted-foreground'>
          Average time before switching companies.
        </p>
      </CardContent>
    </Card>
  );
}
