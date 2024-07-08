import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import React, { useState } from 'react';

import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import { InterviewMemberSide } from '@/devlink2/InterviewMemberSide';
import SearchField from '@/src/components/Common/SearchField/SearchField';
import { ShowCode } from '@/src/components/Common/ShowCode';

import DynamicLoader from '../../Interviewers/DynamicLoader';
import { ScheduleListType } from './hooks';
import ScheduleMeetingList from './ScheduleMeetingList';

function ModuleSchedules({
  isFetched,
  newScheduleList,
}: {
  isFetched: boolean;
  newScheduleList: ScheduleListType;
}) {
  const [filter, setFilter] = React.useState<
    'all' | 'confirmed' | 'cancelled' | 'completed' | 'waiting'
  >('confirmed');
  const [changeText, setChangeText] = useState('');

  if (!isFetched) {
    return <DynamicLoader />;
  }

  const newFilterSchedules = () => {
    const filSch = newScheduleList;

    switch (filter) {
      case 'all':
        return filSch;
      default:
        return filSch.filter(
          (sch) =>
            sch.interview_meeting.status === filter &&
            sch.interview_meeting.session_name
              .toLowerCase()
              .includes(changeText.toLowerCase()),
        );
    }
  };

  const upcomingCount = newScheduleList.filter(
    (sch) =>
      sch.interview_meeting.status === 'confirmed' &&
      sch.interview_meeting.session_name
        .toLowerCase()
        .includes(changeText.toLowerCase()),
  ).length;
  const cancelCount = newScheduleList.filter(
    (sch) =>
      sch.interview_meeting.status === 'cancelled' &&
      sch.interview_meeting.session_name
        .toLowerCase()
        .includes(changeText.toLowerCase()),
  ).length;
  const pastCount = newScheduleList.filter(
    (sch) =>
      sch.interview_meeting.status === 'completed' &&
      sch.interview_meeting.session_name
        .toLowerCase()
        .includes(changeText.toLowerCase()),
  ).length;

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
      textUpcomingCount={upcomingCount}
      textCancelledCount={cancelCount}
      textPastCount={pastCount}
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
