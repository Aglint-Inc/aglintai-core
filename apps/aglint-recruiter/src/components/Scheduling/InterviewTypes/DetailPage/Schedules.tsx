import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import { InterviewMemberSide } from '@/devlink2/InterviewMemberSide';
import CalendarComp from '@/src/components/Common/Calendar/Calendar';
import Loader from '@/src/components/Common/Loader';
import SearchField from '@/src/components/Common/SearchField/SearchField';

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
            <Loader />
          ) : allSchedules.length === 0 ? (
            <AllInterviewEmpty textDynamic='No schedule found' />
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
