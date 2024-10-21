import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { MessageSquareOff } from 'lucide-react';

import { useInterviewer } from '../../hooks/useInterviewer';
import { List } from './ui/List';
export const Feedback = () => {
  const { data } = useInterviewer();
  const { feedbacks } = data;

  if (!data) {
    return <>Data fetching error</>;
  }
  return (
    <>
      <Section>
        <SectionHeader>
          <SectionHeaderText>
            <SectionTitle>Interview Feedback</SectionTitle>
          </SectionHeaderText>
        </SectionHeader>
        <div>
          {data.feedbacks?.length ? (
            feedbacks
              .slice(0, 3)
              .map((feedback) => (
                <List key={feedback.session_name} feedback={feedback} />
              ))
          ) : (
            <div className='flex w-full items-center justify-center'>
              <EmptyState
                variant='inline'
                icon={MessageSquareOff}
                description='No feedback given yet'
              />
            </div>
          )}
        </div>
      </Section>
    </>
  );
};
