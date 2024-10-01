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
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <h1 className='text-lg font-bold'>Recently Completed</h1>
            <Link href={'/interviews/all'}>
              <UIButton size='sm' variant='ghost'>
                View All
              </UIButton>
            </Link>
          </div>
          <ScheduleMeetingList
            filterSchedules={(schedules ?? []).slice(0, 5)}
          />
        </div>
      )}
    </>
  );
}

export default RecentCompletedInterviews;
