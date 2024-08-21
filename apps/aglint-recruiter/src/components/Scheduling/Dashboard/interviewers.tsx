import Stack from '@mui/material/Stack';
import React, { memo } from 'react';

import { InterviewersCardList } from '@/devlink3/InterviewersCardList';
import { InterviewersDash } from '@/devlink3/InterviewersDash';
import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/src/context/SchedulingAnalytics';

import Loader from '../../Common/Loader';
import { Empty } from './common';

export const Interviewers = memo(() => {
  const { interviewersType, setInterviewersType } = useSchedulingAnalytics();
  return (
    <InterviewersDash
      isQualifiedActive={interviewersType === 'qualified'}
      isTraineeActive={interviewersType === 'training'}
      onClickQualified={{ onClick: () => setInterviewersType('qualified') }}
      onClickTrainee={{ onClick: () => setInterviewersType('training') }}
      slotInterviewersCardList={<Container />}
    />
  );
});
Interviewers.displayName = 'Interviewers';

const Container = memo(() => {
  const {
    interviewers: { data: d, status },
  } = useSchedulingAnalytics();

  const data = [
    ...(d ?? []),
    {
      user_id: 'abc',
      name: 'abc',
      accepted: 3,
      declined: 4,
    },
  ];

  if (status === 'pending') return <Loader />;

  if (status === 'error') return <>Error</>;

  if (data.length === 0) return <Empty />;

  return <List data={data} />;
});
Container.displayName = 'Container';

type Props = Pick<SchedulingAnalyticsContextType['interviewers'], 'data'>;

const List = ({ data }: Props) => {
  return (
    <>
      {(data ?? []).map(({ user_id, name, accepted, declined }) => (
        <Stack
          key={user_id}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'var(--neutral-3)',
            },
          }}
        >
          <InterviewersCardList
            textName={name}
            textCompleted={accepted}
            textDeclined={declined}
            textUpcoming={''}
          />
        </Stack>
      ))}
    </>
  );
};
