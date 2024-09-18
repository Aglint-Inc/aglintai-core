import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { MessageSquareOff } from 'lucide-react';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';

export const Feedback = ({
  feedbacks,
}: {
  feedbacks: InterviewerDetailType['feedbacks'];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Interview Feedback Provided</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {feedbacks?.length ? (
            feedbacks.map((feedback, index) => (
              <div key={index} className='rounded-lg bg-gray-50 p-4'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h3 className='text-base font-medium'>from</h3>
                    <p className='mt-1 text-sm text-gray-500'>date</p>
                  </div>
                  <Badge variant='secondary'>from</Badge>
                </div>
                <p className='mt-2 text-sm'>{feedback?.feedback?.objective}</p>
              </div>
            ))
          ) : (
            <div className='flex h-[100px] w-full flex-col items-center justify-center space-y-2 text-gray-500'>
              <MessageSquareOff className='h-8 w-8' />
              <p>No feedback available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
