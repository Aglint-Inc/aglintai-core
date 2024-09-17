import { Skeleton } from '@components/ui/skeleton';
import Stack from '@mui/material/Stack';
import { BarChart2, Loader2 } from 'lucide-react';
import React, { memo } from 'react';

import { InterviewersCardList } from '@/components/Interviewers/ex/components/_common/InterviewersCardList';
import { InterviewersDash } from '@/components/Interviewers/ex/components/_common/InterviewersDash';
import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/context/SchedulingAnalytics';
import { capitalizeAll } from '@/utils/text/textUtils';

const LIMIT = 4;

export const Interviewers = memo(() => {
  const { interviewersType, setInterviewersType } = useSchedulingAnalytics();
  return (
    <InterviewersDash
      isQualifiedActive={interviewersType === 'qualified'}
      isTraineeActive={interviewersType === 'training'}
      onClickQualified={() => setInterviewersType('qualified')}
      onClickTrainee={() => setInterviewersType('training')}
      slotInterviewersCardList={<Container />}
    />
  );
});
Interviewers.displayName = 'Interviewers';

const Container = memo(() => {
  const {
    interviewers: { data, status },
  } = useSchedulingAnalytics();

  if (status === 'pending')
    return (
      <div className='flex h-[350px] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
      </div>
    );

  if (status === 'error') return <>Error</>;

  if (data.length === 0)
    return (
      <div className='h-[296px]'>
        <div className='flex h-full flex-col items-center justify-center'>
          <BarChart2 className='h-12 w-12 text-gray-400' />
          <p className='mt-2 text-sm text-gray-500'>No data available</p>
        </div>
      </div>
    );

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
    (_, i) => (
<<<<<<< HEAD
      <Skeleton key={i} className='w-full h-full' />
=======
      <InterviewStatsLoader
        key={i}
        slotSkeleton={<Skeleton className='h-full w-full' />}
      />
>>>>>>> 8eb6ea7dfa37de2bebc9079affacd757345fc96f
    ),
  );
});
Loader.displayName = 'Loader';

export const InterviewStatsLoader = ({ slotSkeleton }) => {
  return (
    <div className='grid cursor-pointer grid-cols-[60%_20%_20%] border-b border-[#eaf1f3] bg-white transition-colors duration-200 hover:bg-neutral-100'>
      <div className='p-2 px-4'>
        <div className='relative h-5 w-[150px]'>{slotSkeleton}</div>
      </div>
      <div className='p-2 px-4'>
        <div className='relative h-5 w-5'>{slotSkeleton}</div>
      </div>
      <div className='p-2 px-4'>
        <div className='relative h-5 w-5'>{slotSkeleton}</div>
      </div>
    </div>
  );
};
