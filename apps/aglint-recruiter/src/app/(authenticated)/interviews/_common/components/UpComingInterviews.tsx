import { EmptyState } from '@components/empty-state';
import { Search } from 'lucide-react';

import { Loader } from '@/components/Common/Loader';

import { useScheduleStatesContext } from '../contexts/ScheduleStatesContext';
import { useAllInterviews } from '../hooks/useAllInterviews';
import ScheduleMeetingList from './ui/ScheduleMeetingList';

function UpComingInterviews() {
  const { upcomingFilterState } = useScheduleStatesContext();
  const { data: schedules, isFetched } = useAllInterviews({
    ...upcomingFilterState,
  });
  return (
    <div className='px-4'>
      {!isFetched && <Loader />}
      {isFetched && (schedules ?? [])?.length === 0 && (
        <EmptyState
          icon={
            <Search className='h-6 w-6 text-muted-foreground' strokeWidth={2} />
          }
          header='No interviews found'
          description='There are no interviews matching your filters.'
        />
      )}
      {isFetched && (schedules ?? [])?.length > 0 && (
        <ScheduleMeetingList filterSchedules={schedules ?? []} />
      )}
    </div>
  );
}

export default UpComingInterviews;
