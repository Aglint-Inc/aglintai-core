import { MessageSquareOff } from 'lucide-react';

import { SectionCard } from '@/authenticated/components/SectionCard';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';
import { List } from './ui/List';

export const Feedback = ({
  feedbacks,
}: {
  feedbacks: NonNullable<InterviewerDetailType>['feedbacks'];
}) => {
  return (
    <>
      <SectionCard title='Interview Feedback Provided'>
        <div className='space-y-4'>
          {feedbacks?.length ? (
            feedbacks.map((feedback) => (
              <List key={feedback.session_name} feedback={feedback} />
            ))
          ) : (
            <div className='flex h-[100px] w-full flex-col items-center justify-center space-y-2 text-gray-500'>
              <MessageSquareOff className='h-8 w-8' />
              <p>No feedback available</p>
            </div>
          )}
        </div>
      </SectionCard>
    </>
  );
};
