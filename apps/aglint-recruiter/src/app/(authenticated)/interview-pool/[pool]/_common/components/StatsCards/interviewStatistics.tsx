import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

import { useInterviewStatistics } from '../../hooks/useInterviewStatics';

function InterviewStatistics({ module_id }: { module_id: string }) {
  const { data, isFetched } = useInterviewStatistics(module_id);
  return (
    <Card className='border-t-4 border-t-blue-500 bg-white shadow-sm'>
      <CardHeader>
        <CardTitle className='text-lg font-medium text-gray-800'>
          Interview Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Total Interviews</span>
            <span className='font-bold text-gray-900'>
              {isFetched ? data.total : <Skeleton className='h-6 w-10' />}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Completion Rate</span>
            <span className='font-bold text-green-600'>
              {isFetched ? (
                `${Math.round((data.completed / data.total) * 10000) / 100 || 0} %`
              ) : (
                <Skeleton className='h-6 w-10' />
              )}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Avg. Duration</span>
            <span className='font-bold text-gray-900'>
              {isFetched ? (
                `${data.duration} min`
              ) : (
                <Skeleton className='h-6 w-10' />
              )}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Avg. Time to Schedule</span>
            <span className='font-bold text-gray-900'>
              {isFetched ? data.interval : <Skeleton className='h-6 w-10' />}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default InterviewStatistics;
