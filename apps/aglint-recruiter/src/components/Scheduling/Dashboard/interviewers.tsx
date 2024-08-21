import Stack from '@mui/material/Stack';
import React, { memo } from 'react';

import { InterviewersCardList } from '@/devlink3/InterviewersCardList';
import { InterviewersDash } from '@/devlink3/InterviewersDash';
import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/src/context/SchedulingAnalytics';

import { Empty } from './common';
import { InterviewStatsLoader } from '@/devlink3/InterviewStatsLoader';
import { Skeleton } from '@/devlink2/Skeleton';

const LIMIT = 4;

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

const Loader = memo(() => {
  return [...new Array(Math.trunc(Math.random() * (LIMIT - 1)) + 1)].map(
    (_, i) => <InterviewStatsLoader key={i} slotSkeleton={<Skeleton />} />,
  );
});
Loader.displayName = 'Loader';
