import {
  Section,
  SectionActions,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { ScrollArea } from '@components/ui/scroll-area';
import { ChevronDown, ChevronUp, MessageSquareOff } from 'lucide-react';
import { useState } from 'react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { UIButton } from '@/components/Common/UIButton';

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
            <UIButton size='sm' variant='ghost'>
              View All
            </UIButton>
            {isExpanded ? (
              <ChevronUp size={20} onClick={() => setIsExpanded(false)} />
            ) : (
              <ChevronDown size={20} onClick={() => setIsExpanded(true)} />
            )}
          </SectionActions>
        </SectionHeader>
        {isExpanded && (
          <ScrollArea className='flex h-[300px]'>
            {data.feedbacks?.length ? (
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
                description='No feedback available'
              />
            )}
          </ScrollArea>
        )}
      </Section>
    </>
  );
};
