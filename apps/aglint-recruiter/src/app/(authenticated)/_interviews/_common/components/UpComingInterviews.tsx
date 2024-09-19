import { Calendar } from 'lucide-react';

import { useScheduleStatesContext } from '../contexts/ScheduleStatesContext';
import { useAllInterviews } from '../hooks/useAllInterviews';
import UpComingInterviewFilters from './Filters/upComingFilter';
import ScheduleMeetingList from './ScheduleMeetingList';

function UpComingInterviews() {
  const { upcomingFilterState } = useScheduleStatesContext();
  const { data: schedules, isFetched } = useAllInterviews({
    ...upcomingFilterState,
  });

  return (
    <>
      <UpComingInterviewFilters />
      {!isFetched && <div>Loading...</div>}
      {isFetched && schedules?.length === 0 && (
        <div className='flex items-center justify-center'>
          <div className='w-[300px] max-w-sm p-2'>
            <div className='flex flex-col items-center justify-center p-8 text-center'>
              <Calendar className='mb-2 h-12 w-12 text-gray-400' />
              <h3 className='mb-1 text-lg font-medium text-gray-900'>
                No schedule found
              </h3>
              <p className='text-sm text-gray-500'>
                There are no schedules available at the moment.
              </p>
            </div>
          </div>
        </div>
      )}
      <ScheduleMeetingList filterSchedules={schedules} />
    </>
  );
}

export default UpComingInterviews;
