import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import React from 'react';

import { useInterviewerPerformance } from '../../hooks/useInterviewStatics';

function InterviewerPerformance({ module_id }: { module_id: string }) {
  const { data, isFetched } = useInterviewerPerformance(module_id);
  return (
    <Card className='border-t-4 border-t-green-500 bg-white shadow-sm'>
      <CardHeader>
        <CardTitle className='text-lg font-medium text-gray-800'>
          Interviewer Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Avg. Rating</span>
            <span className='font-bold text-gray-900'>
              {isFetched ? (
                `${data.candidate_feedback_avg} / 5.0`
              ) : (
                <Skeleton className='h-6 w-10' />
              )}
            </span>
          </div>

          <div className='flex justify-between'>
            <span className='text-gray-600'>Feedback Rate</span>
            <span className='font-bold text-amber-600'>
              {isFetched ? (
                `${((data.interviewer_feedback_count / data.total_interviews) * 10000) / 100 || 0} %`
              ) : (
                <Skeleton className='h-6 w-10' />
              )}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Hire Recommendation Accuracy</span>
            <span className='font-bold text-gray-900'>
              {isFetched ? (
                `${data.recommendation_success} %`
              ) : (
                <Skeleton className='h-6 w-10' />
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default InterviewerPerformance;
