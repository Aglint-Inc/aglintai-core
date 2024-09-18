import React from 'react';

import ScheduleMeetingList from '../../Common/ModuleSchedules/ScheduleMeetingList';
import { useAllInterviews } from '../_common/hooks/useAllInterviews';

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
      {!isFetched && <div>Loading...</div>}
      {isFetched && schedules?.length === 0 && <div>No schedules found</div>}
      {isFetched && (
        <ScheduleMeetingList filterSchedules={schedules.slice(0, 5)} />
      )}
    </>
  );
}

export default RecentCompletedInterviews;
