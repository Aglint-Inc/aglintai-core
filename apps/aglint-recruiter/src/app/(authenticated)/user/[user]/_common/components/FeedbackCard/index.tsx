import { MessageSquareOff } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import UISectionCard from '@/components/Common/UISectionCard';

import { type InterviewerDetailType } from '../../hooks/useInterviewer';
import { List } from './ui/List';

export const Feedback = ({
  feedbacks,
}: {
  feedbacks: NonNullable<InterviewerDetailType>['feedbacks'];
}) => {
  return (
    <>
      <UISectionCard title='Interview Feedback Provided'>
        <div className='space-y-4'>
          {feedbacks?.length ? (
            feedbacks.map((feedback) => (
              <List key={feedback.session_name} feedback={feedback} />
            ))
          ) : (
            <GlobalEmpty
              icon={
                <MessageSquareOff
                  strokeWidth={2}
                  className='h-6 w-6 text-muted-foreground'
                />
              }
              header='No feedback available'
            />
          )}
        </div>
      </UISectionCard>
    </>
  );
};
