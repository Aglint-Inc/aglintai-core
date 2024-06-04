import { InputAdornment, Stack } from '@mui/material';
import React, { useState } from 'react';

import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
import { InterviewMemberSide } from '@/devlink2/InterviewMemberSide';
import Icon from '@/src/components/Common/Icons/Icon';
import { ShowCode } from '@/src/components/Common/ShowCode';
import UITextField from '@/src/components/Common/UITextField';

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

  return (
    <InterviewMemberSide
      slotInterview={
        <Stack>
          <UITextField
            width='400px'
            value={changeText}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Icon variant='JobSearch' height='14' />
                </InputAdornment>
              ),
            }}
            placeholder={'Search by session name'}
            onChange={(e) => {
              setChangeText(e.target.value);
            }}
            height={42}
          />
        </Stack>
      }
      isUpcomingActive={filter === 'confirmed'}
      isCancelActive={filter === 'cancelled'}
      isCompletedActive={filter === 'completed'}
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
            <AllInterviewEmpty textDynamic='No schedule found' />
          </ShowCode.When>
          <ShowCode.When isTrue={isFetched}>
            <Stack height={'calc(100vh - 154px)'}>
              <ScheduleMeetingList filterSchedules={newFilterSchedules()} />
            </Stack>
          </ShowCode.When>
        </ShowCode>
      }
    />
  );
}

export default ModuleSchedules;
