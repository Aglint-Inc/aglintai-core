import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { ChevronDown, ChevronUp, MessageSquareOff } from 'lucide-react';
import { useState } from 'react';

import { useInterviewer } from '../../hooks/useInterviewer';
import { List } from './ui/List';
export const Feedback = () => {
  const [isExpanded, setIsExpanded] = useState(true);
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
          <SectionActions>
            {isExpanded ? (
              <ChevronUp size={20} onClick={() => setIsExpanded(false)} />
            ) : (
              <ChevronDown size={20} onClick={() => setIsExpanded(true)} />
            )}
          </SectionActions>
        </SectionHeader>
        {isExpanded && (
          <div className='min-h-[300px]'>
            {data.feedbacks?.length ? (
              feedbacks
                .slice(0, 3)
                .map((feedback) => (
                  <List key={feedback.session_name} feedback={feedback} />
                ))
            ) : (
              <div className='flex min-h-[300px] w-full items-center justify-center'>
                <EmptyState
                  variant='inline'
                  icon={MessageSquareOff}
                  description='No feedback given yet'
                />
              </div>
            )}
          </div>
        )}
      </Section>
    </>
  );
};
