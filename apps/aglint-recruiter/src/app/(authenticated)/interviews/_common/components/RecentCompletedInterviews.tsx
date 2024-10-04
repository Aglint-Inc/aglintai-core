import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import Link from 'next/link';
import React from 'react';

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
            </SectionActions>
          </SectionHeader>
          <ScheduleMeetingList
            filterSchedules={(schedules ?? []).slice(0, 5)}
          />
        </Section>
      )}
    </>
  );
}

export default RecentCompletedInterviews;
