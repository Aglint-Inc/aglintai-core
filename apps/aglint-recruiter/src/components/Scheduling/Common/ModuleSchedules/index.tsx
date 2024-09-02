import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';

import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import { InterviewMemberSide } from '@/devlink2/InterviewMemberSide';
import SearchField from '@/src/components/Common/SearchField/SearchField';
import { ShowCode } from '@/src/components/Common/ShowCode';

import DynamicLoader from '../../Interviewers/DynamicLoader';
import { type fetchModuleSchedules } from '../../InterviewTypes/queries/utils';
import ScheduleMeetingList from './ScheduleMeetingList';

type tabs = 'all' | 'confirmed' | 'cancelled' | 'completed' | 'waiting';
function ModuleSchedules({
  isFetched,
  newScheduleList,
}: {
  isFetched: boolean;
  newScheduleList: Awaited<ReturnType<typeof fetchModuleSchedules>>;
}) {
  const [filter, setFilter] = React.useState<tabs>('confirmed');
  const [changeText, setChangeText] = useState('');

  if (!isFetched) {
    return <DynamicLoader />;
  }

  const countCalculation = (tab: tabs) => {
    return newScheduleList.filter(
      (sch) =>
        sch.status === tab &&
        sch.session_name
          .toLowerCase()
          .includes(changeText.toLowerCase()),
    );
  };

  const newFilterSchedules = () => {
    const filSch = newScheduleList;

    switch (filter) {
      case 'all':
        return filSch;
      default:
        return countCalculation(filter);
    }
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
      textUpcomingCount={countCalculation('confirmed').length}
      textCancelledCount={countCalculation('cancelled').length}
      textPastCount={countCalculation('completed').length}
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
        <ShowCode>
          <ShowCode.When
            isTrue={isFetched && newFilterSchedules()?.length === 0}
          >
            <Box
              sx={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 128px)',
                backgroundColor: 'var(--neutral-2)', // replace with your desired background color
              }}
            >
              <Box maxWidth='sm' width='300px' p={2}>
                <AllInterviewEmpty textDynamic='No schedule found' />
              </Box>
            </Box>
          </ShowCode.When>
          <ShowCode.When isTrue={isFetched}>
            <ScheduleMeetingList filterSchedules={newFilterSchedules()} />
          </ShowCode.When>
        </ShowCode>
      }
    />
  );
}

export default ModuleSchedules;
