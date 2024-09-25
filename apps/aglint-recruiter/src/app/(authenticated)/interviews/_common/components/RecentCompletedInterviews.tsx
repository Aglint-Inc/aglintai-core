import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
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
      {isFetched && schedules?.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>
              <div className='flex justify-between'>
                <h1>Recently Completed</h1>
                <Link href={'/interviews/all'}>
                  <UIButton size='sm' variant='ghost'>
                    View All
                  </UIButton>
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScheduleMeetingList filterSchedules={schedules.slice(0, 5)} />
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default RecentCompletedInterviews;
