import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Progress } from '@components/ui/progress';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

import { useCandidatePipeline } from '../../hooks/useInterviewStatics';

function CandidatePipeline({ module_id }: { module_id: string }) {
  const { data, isFetched } = useCandidatePipeline(module_id);
  const divider = (data?.applied || 0) / 100;
  return (
    <Card className='border border-border bg-muted shadow-sm'>
      <CardHeader>
        <CardTitle className='text-lg font-medium'>
          Candidate Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Applied</span>
            <div className='flex items-center space-x-2'>
              <span className='font-bold text-muted-foreground'>
                {isFetched ? data?.applied : <Skeleton className='h-6 w-10' />}
              </span>
              <Progress
                value={100}
                className='w-[60px] bg-muted-foreground/35'
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Screened</span>
            <div className='flex items-center space-x-2'>
              <span className='font-bold text-muted-foreground'>
                {isFetched ? data?.screened : <Skeleton className='h-6 w-10' />}
              </span>
              <Progress
                value={isFetched ? (data?.screened ?? 0) / divider : 0}
                className='w-[60px] bg-muted-foreground/35'
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Interviewed</span>
            <div className='flex items-center space-x-2'>
              <span className='font-bold text-muted-foreground'>
                {isFetched ? (
                  data?.interviewed
                ) : (
                  <Skeleton className='h-6 w-10' />
                )}
              </span>
              <Progress
                value={isFetched ? (data?.interviewed ?? 0) / divider : 0}
                className='w-[60px] bg-muted-foreground/35'
              />
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Offered</span>
            <div className='flex items-center space-x-2'>
              <span className='font-bold text-muted-foreground'>
                {isFetched ? data?.offered : <Skeleton className='h-6 w-10' />}
              </span>
              <Progress
                value={isFetched ? (data?.offered ?? 0) / divider : 0}
                className='w-[60px] bg-muted-foreground/35'
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CandidatePipeline;
