import { type DatabaseTable } from '@aglint/shared-types';
import { Card } from '@components/ui/card';
import { Calendar } from 'lucide-react';
import { useState } from 'react';

import CalendarComp from '@/components/Common/Calendar/Calendar';
import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { Loader } from '@/components/Common/Loader';

import { usePoolSchedules } from '../../../hooks/useSchedulesPool';

function Schedules() {
  const [filter, setFilter] = useState<
    DatabaseTable['interview_meeting']['status'][]
  >(['completed', 'confirmed', 'cancelled']);

  const { data: allSchedules, isFetching: isLoading } = usePoolSchedules({
    filters: filter,
  });

  return (
    <>
      {isLoading ? (
        <div className='flex h-[400px] w-full items-center justify-center'>
          <Loader />
        </div>
      ) : (allSchedules || []).length === 0 ? (
        <div className='w-full'>
          <GlobalEmpty
            icon={
              <Calendar
                strokeWidth={1.5}
                className='mb-2 h-10 w-10 text-muted-foreground'
              />
            }
            header={'There are no schedules available at the moment.'}
            description='Create a new interview pool to get started.'
          />
        </div>
      ) : (
        <Card className='p-4'>
          <CalendarComp
            allSchedules={allSchedules as any} //TODO:fix
            isLoading={isLoading}
            setFilter={setFilter}
            filter={filter}
          />
        </Card>
      )}
    </>
  );
}

export default Schedules;
