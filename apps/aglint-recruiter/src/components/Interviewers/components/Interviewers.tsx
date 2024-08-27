import Stack from '@mui/material/Stack';
import { memo, useState } from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { Skeleton } from '@/devlink2/Skeleton';
import { InterviewersCardList } from '@/devlink3/InterviewersCardList';
import { InterviewersDash } from '@/devlink3/InterviewersDash';
import { InterviewStatsLoader } from '@/devlink3/InterviewStatsLoader';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { useMatricsInterviewers, useMatricsInterviewersType } from '../Hook';

const LIMIT = 4;

export const Interviewers = memo(() => {
  const [interviewersType, setInterviewersType] = useState<
    'training' | 'qualified'
  >('qualified');
  return (
    <InterviewersDash
      isQualifiedActive={interviewersType === 'qualified'}
      isTraineeActive={interviewersType === 'training'}
      onClickQualified={{ onClick: () => setInterviewersType('qualified') }}
      onClickTrainee={{ onClick: () => setInterviewersType('training') }}
      slotInterviewersCardList={<Container type={interviewersType} />}
    />
  );
});
Interviewers.displayName = 'Interviewers';

const Container = memo(({ type }: { type: 'training' | 'qualified' }) => {
  const { data, status } = useMatricsInterviewers({ type });

  if (status === 'pending') return <Loader />;

  if (status === 'error') return <>Error</>;

  if (data.length === 0)
    return (
      <Stack>
        <GlobalEmptyState
          iconName={'monitoring'}
          size={8}
          textDesc={'No Data Available'}
        />
      </Stack>
    );

  return <List data={data} />;
});
Container.displayName = 'Container';

const List = ({ data }: { data: useMatricsInterviewersType }) => {
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
            textName={capitalizeAll(name)}
            textCompleted={accepted}
            textDeclined={declined}
            textUpcoming={'--'}
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
