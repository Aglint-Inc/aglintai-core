import { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import { InterviewMemberSide } from '@/devlink2/InterviewMemberSide';
import { NewMyScheduleCard } from '@/devlink3/NewMyScheduleCard';
import SearchField from '@/src/components/Common/SearchField/SearchField';
import { DateIcon } from '@/src/components/CompanyDetailComp/SettingsSchedule/Components/DateSelector';

import ScheduleMeetingCard from '../../Common/ModuleSchedules/ScheduleMeetingCard';
import {
  SchedulesSupabase,
  transformDataSchedules,
} from '../../schedules-query';
import { fetchSchedulesCountByUserId } from '../InterviewerDetail/query';

function FullCalendar({
  allSchedules,
  isLoading,
  filter,
  setFilter,
  changeText,
  setChangeText,
}: {
  allSchedules: SchedulesSupabase;
  isLoading: boolean;
  filter: DatabaseTable['interview_meeting']['status'];
  setFilter: Dispatch<
    SetStateAction<DatabaseTable['interview_meeting']['status']>
  >;
  changeText: string;
  setChangeText: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  const [counts, setCounts] = useState({
    upcomingCount: 0,
    completedCount: 0,
    cancelledCount: 0,
  });

  const member_id = router?.query?.user_id as string;

  useEffect(() => {
    if (member_id) {
      (async () => {
        const res = await fetchSchedulesCountByUserId(member_id);
        setCounts(res);
      })();
    }
  }, [member_id]);

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
          {isLoading ? (
            ''
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

export default FullCalendar;
