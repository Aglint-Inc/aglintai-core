import { Calendar } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { Loader } from '@/components/Common/Loader';

import { useScheduleStatesContext } from '../contexts/ScheduleStatesContext';
import { useAllInterviews } from '../hooks/useAllInterviews';
import ScheduleMeetingList from './ui/ScheduleMeetingList';

function AllInterviews() {
  const { filterState } = useScheduleStatesContext();
  const { data: schedules, isFetched } = useAllInterviews({
    ...filterState,
  });
  return (
    <>
      <div className='px-4'>
        {!isFetched && <Loader />}
        {isFetched && schedules?.length === 0 && (
          <GlobalEmpty
            icon={
              <Calendar
                className='h-6 w-6 text-muted-foreground'
                strokeWidth={2}
              />
            }
            header='No interviews found'
            description='There are no interviews matching your filters.'
          />
        )}
        <ScheduleMeetingList filterSchedules={schedules ?? []} />
      </div>
    </>
  );
}

export default AllInterviews;
