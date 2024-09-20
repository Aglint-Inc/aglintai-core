import React from 'react';

import { Loader } from '@/components/Common/Loader';

import { useAllInterviews } from '../hooks/useAllInterviews';
import ScheduleMeetingList from './ScheduleMeetingList';

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
      {!isFetched && <Loader />}
      {isFetched && schedules?.length === 0 && <div>No schedules found</div>}
      {isFetched && (
        <ScheduleMeetingList filterSchedules={schedules.slice(0, 5)} />
      )}
    </>
  );
}

export default RecentCompletedInterviews;
