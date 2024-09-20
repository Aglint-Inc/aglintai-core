import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { useInterviewsByUserId } from '@interviews/hooks/useInterviewsByUserId';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import CalendarComp from '@/components/Common/Calendar/Calendar';

export const Calendar = () => {
  const user_id = useParams().user as string;
  const [filter, setFilter] = useState([]);
  const {
    data: { schedules: allSchedules },
    isLoading,
  } = useInterviewsByUserId({
    filter: filter.length === 0 ? null : filter,
    member_id: user_id,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Schedule Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <CalendarComp
          allSchedules={allSchedules}
          isLoading={isLoading}
          filter={filter}
          setFilter={setFilter}
        />
      </CardContent>
    </Card>
  );
};
