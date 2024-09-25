import { Calendar } from 'lucide-react';

import { Loader } from '@/components/Common/Loader';

import { useScheduleStatesContext } from '../contexts/ScheduleStatesContext';
import { useAllInterviews } from '../hooks/useAllInterviews';
import UpComingInterviewFilters from './Filters/upComingFilter';
import ScheduleMeetingList from './ui/ScheduleMeetingList';

function UpComingInterviews() {
  const { upcomingFilterState } = useScheduleStatesContext();
  const { data: schedules, isFetched } = useAllInterviews({
    ...upcomingFilterState,
  });
  return (
    <>
      <UpComingInterviewFilters />
      {!isFetched && <Loader />}
      {isFetched && (schedules ?? [])?.length === 0 && (
        <div className='mt-4 flex min-h-[500px] items-center justify-center'>
          <div className='mx-auto flex w-full max-w-md flex-col items-center border-none px-6 pb-8 pt-6 text-center shadow-none'>
            <div className='mb-4 flex items-center justify-center'>
              <Calendar
                className='h-16 w-16 text-primary'
                strokeWidth={0.5}
                size={48}
              />
            </div>
            <h3 className='mb-2 text-lg font-semibold'>No interviews found</h3>
            <p className='mb-6 text-muted-foreground'>
              There are no upcoming interviews.
            </p>
          </div>
        </div>
      )}
      {isFetched && (schedules ?? [])?.length > 0 && (
        <ScheduleMeetingList filterSchedules={schedules ?? []} />
      )}
    </>
  );
}

export default UpComingInterviews;
