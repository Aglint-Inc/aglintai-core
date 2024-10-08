import { type DatabaseTable } from '@aglint/shared-types';
import { Card } from '@components/ui/card';
import { useState } from 'react';

import CalendarComp from '@/components/Common/Calendar/Calendar';
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
