import { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import { InterviewMemberSide } from '@/devlink2/InterviewMemberSide';
import { NewMyScheduleCard } from '@/devlink3/NewMyScheduleCard';
import Loader from '@/src/components/Common/Loader';
import SearchField from '@/src/components/Common/SearchField/SearchField';

import ScheduleMeetingCard from '../../Common/ModuleSchedules/ScheduleMeetingCard';
import { transformDataSchedules } from '../../schedules-query';
import { DateIcon } from '../../Settings/Components/DateSelector';
import { useAllSchedulesByModuleId } from '../queries/hooks';
import { fetchSchedulesCountByModule } from '../queries/utils';

function SchedulesModules() {
  const router = useRouter();
  const [filter, setFilter] =
    useState<DatabaseTable['interview_meeting']['status']>('confirmed');

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
    if (router.query.module_id) {
      (async () => {
        const res = await fetchSchedulesCountByModule(
          router.query.module_id as string,
        );
        setCounts(res);
      })();
    }
  }, []);

  return (
    <InterviewMemberSide
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
      isUpcomingActive={filter === 'confirmed'}
      isCancelActive={filter === 'cancelled'}
      isCompletedActive={filter === 'completed'}
      textUpcomingCount={counts.upcomingCount}
      textCancelledCount={counts.cancelledCount}
      textPastCount={counts.completedCount}
      onClickUpcoming={{
        onClick: () => setFilter('confirmed'),
      }}
      onClickCancelled={{
        onClick: () => setFilter('cancelled'),
      }}
      onClickCompleted={{
        onClick: () => setFilter('completed'),
      }}
      slotInterviewCard={
        <>
          {isLoading && allSchedules.length === 0 ? (
            <Loader />
          ) : allSchedules.length === 0 ? (
            <AllInterviewEmpty textDynamic='No schedule found' />
          ) : (
            <>
              {transformDataSchedules(allSchedules).map((sch, ind) => {
                const date = Object.keys(sch)[0];
                const schedules = sch[String(date)];
                return (
                  <NewMyScheduleCard
                    key={ind}
                    textDate={
                      date != 'undefined' ? dayjsLocal(date).format('DD') : null
                    }
                    textDay={
                      date != 'undefined'
                        ? dayjsLocal(date).format('ddd')
                        : null
                    }
                    textMonth={
                      date != 'undefined' ? (
                        dayjsLocal(date).format('MMM')
                      ) : (
                        <DateIcon />
                      )
                    }
                    slotMyScheduleSubCard={schedules.map(
                      (meetingDetails, i) => {
                        return (
                          <ScheduleMeetingCard
                            key={i}
                            meetingDetails={meetingDetails}
                          />
                        );
                      },
                    )}
                  />
                );
              })}
            </>
          )}
        </>
      }
    />
  );
}

export default SchedulesModules;
