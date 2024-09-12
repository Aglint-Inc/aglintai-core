import { type DatabaseTable } from '@aglint/shared-types';
import { InterviewMemberSide } from '@devlink2/InterviewMemberSide';
import { Calendar, Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import CalendarComp from '@/components/Common/Calendar/Calendar';
import SearchField from '@/components/Common/SearchField/SearchField';

import { useAllSchedulesByModuleId } from '../queries/hooks';
import { fetchSchedulesCountByModule } from '../queries/utils';

function SchedulesModules() {
  const router = useRouter();

  const [filter, setFilter] = useState<
    DatabaseTable['interview_meeting']['status'][]
  >(['completed', 'confirmed', 'cancelled']);

  const [changeText, setChangeText] = useState('');

  const { data: allSchedules, isFetching: isLoading } =
    useAllSchedulesByModuleId({
      filter,
      changeText,
    });

  const [counts, setCounts] = useState({
    upcomingCount: 0,
    completedCount: 0,
    cancelledCount: 0,
  });

  useEffect(() => {
    if (router.query.type_id) {
      (async () => {
        const res = await fetchSchedulesCountByModule(
          router.query.type_id as string,
        );
        setCounts(res);
      })();
    }
  }, []);

  return (
    <InterviewMemberSide
      propsGrids={{
        style: {
          maxWidth: 'none',
          padding: 0,
        },
      }}
      isMenuTabVisible={false}
      slotInterview={
        <SearchField
          value={changeText}
          onChange={(e) => {
            setChangeText(e.target.value);
          }}
          onClear={() => setChangeText('')}
          placeholder={'Search by session name'}
        />
      }
      isUpcomingActive={false}
      textUpcomingCount={counts.upcomingCount}
      textCancelledCount={counts.cancelledCount}
      textPastCount={counts.completedCount}
      slotInterviewCard={
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
      }
    />
  );
}

export default SchedulesModules;
