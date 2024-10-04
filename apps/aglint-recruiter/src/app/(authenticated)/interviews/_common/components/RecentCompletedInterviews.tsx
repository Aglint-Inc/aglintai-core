import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { ScrollArea } from '@components/ui/scroll-area';
import { ChevronDown } from 'lucide-react';
import { ChevronUp } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';

import { useAllInterviews } from '../hooks/useAllInterviews';
import ScheduleMeetingList from './ui/ScheduleMeetingList';

function RecentCompletedInterviews() {
  const { data: schedules, isFetched } = useAllInterviews({
    status: ['completed'],
    jobs: [],
    schedule_types: [],
    interviewers: [],
    date: [],
    session_types: [],
    searchText: '',
  });
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <>
      {/* {!isFetched && <Loader />} */}
      {isFetched && (schedules ?? [])?.length > 1 && (
        <Section>
          <SectionHeader>
            <SectionHeaderText>
              <SectionTitle>Recently Completed</SectionTitle>
              <SectionDescription>
                View your recently completed interviews.
              </SectionDescription>
            </SectionHeaderText>
            <SectionActions>
              <Link href={'/interviews/all'}>
                <UIButton size='sm' variant='ghost'>
                  View All
                </UIButton>
              </Link>
              {isExpanded ? (
                <ChevronUp size={20} onClick={() => setIsExpanded(false)} />
              ) : (
                <ChevronDown size={20} onClick={() => setIsExpanded(true)} />
              )}
            </SectionActions>
          </SectionHeader>
          {isExpanded && (
            <ScrollArea className='h-[340px] gap-4'>
              <ScheduleMeetingList
                filterSchedules={(schedules ?? []).slice(0, 5)}
              />
            </ScrollArea>
          )}
        </Section>
      )}
    </>
  );
}

export default RecentCompletedInterviews;
