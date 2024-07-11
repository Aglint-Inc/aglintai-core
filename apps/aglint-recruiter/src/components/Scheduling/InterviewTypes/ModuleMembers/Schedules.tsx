import { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import React, { useState } from 'react';

import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import { InterviewMemberSide } from '@/devlink2/InterviewMemberSide';
import { NewMyScheduleCard } from '@/devlink3/NewMyScheduleCard';
import SearchField from '@/src/components/Common/SearchField/SearchField';

import ScheduleMeetingCard from '../../Common/ModuleSchedules/ScheduleMeetingCard';
import { transformDataSchedules } from '../../schedules-query';
import { DateIcon } from '../../Settings/Components/DateSelector';
import { useAllSchedulesByModuleId } from '../queries/hooks';
import Loader from '@/src/components/Common/Loader';

function SchedulesModules() {
  const [filter, setFilter] =
    useState<DatabaseTable['interview_meeting']['status']>('confirmed');

  const [changeText, setChangeText] = React.useState('');

  const { data: allSchedules, isFetching: isLoading } =
    useAllSchedulesByModuleId({
      filter,
    });

  const countCalculation = (
    tab: DatabaseTable['interview_meeting']['status'],
  ) => {
    return allSchedules.filter((sch) => sch.status === tab).length;
  };

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
            placeholder={'Search by session.'}
          />
        </Stack>
      }
      isUpcomingActive={filter === 'confirmed'}
      isCancelActive={filter === 'cancelled'}
      isCompletedActive={filter === 'completed'}
      textUpcomingCount={countCalculation('waiting')}
      textCancelledCount={countCalculation('cancelled')}
      textPastCount={countCalculation('completed')}
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
