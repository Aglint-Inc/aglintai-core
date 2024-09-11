import { type DatabaseTable } from '@aglint/shared-types';
import { InterviewMemberSide } from '@devlink2/InterviewMemberSide';
import { Stack } from '@mui/material';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import CalendarComp from '@/components/Common/Calendar/Calendar';
import Loader from '@/components/Common/Loader';
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
        <Stack>
          <SearchField
            value={changeText}
            onChange={(e) => {
              setChangeText(e.target.value);
            }}
            onClear={() => setChangeText('')}
            placeholder={'Search by session name'}
          />
        </Stack>
      }
      isUpcomingActive={false}
      textUpcomingCount={counts.upcomingCount}
      textCancelledCount={counts.cancelledCount}
      textPastCount={counts.completedCount}
      slotInterviewCard={
        <>
          {isLoading && allSchedules.length === 0 ? (
            <Stack width={'820px'} height={'calc(100vh - 200px)'}>
              <Loader />
            </Stack>
          ) : allSchedules.length === 0 ? (
            <Stack width={'820px'}>
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mb-2" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No schedule found</h3>
                <p className="text-sm text-gray-500">There are no schedules available at the moment.</p>
              </div>
            </Stack>
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
