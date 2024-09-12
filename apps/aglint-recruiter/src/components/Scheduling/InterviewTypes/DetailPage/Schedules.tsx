import { type DatabaseTable } from '@aglint/shared-types';
import { Calendar, Loader2 } from 'lucide-react';
import { useState } from 'react';

import CalendarComp from '@/components/Common/Calendar/Calendar';

import { useAllSchedulesByModuleId } from '../queries/hooks';

function SchedulesModules() {
  const [filter, setFilter] = useState<
    DatabaseTable['interview_meeting']['status'][]
  >(['completed', 'confirmed', 'cancelled']);

  const { data: allSchedules, isFetching: isLoading } =
    useAllSchedulesByModuleId({
      filter,
      changeText: '',
    });

  return (
    <>
      {isLoading && allSchedules.length === 0 ? (
        <div className='w-[820px] h-[calc(100vh-200px)] flex items-center justify-center'>
          <Loader2 className='w-8 h-8 animate-spin' />
        </div>
      ) : allSchedules.length === 0 ? (
        <div className='w-[820px]'>
          <div className='flex flex-col items-center justify-center p-8 text-center'>
            <Calendar className='w-12 h-12 text-muted-foreground mb-2' />
            <h3 className='text-lg font-medium text-foreground mb-1'>
              No schedule found
            </h3>
            <p className='text-sm text-muted-foreground'>
              There are no schedules available at the moment.
            </p>
          </div>
        </div>
      ) : (
        <>
          <CalendarComp
            allSchedules={allSchedules}
            isLoading={isLoading}
            setFilter={setFilter}
            filter={filter}
          />
        </>
      )}
    </>
  );
}

export default SchedulesModules;
