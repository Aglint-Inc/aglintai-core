import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { BarChart2, Loader2 } from 'lucide-react';
import React, { memo } from 'react';

import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/context/SchedulingAnalytics';
import { capitalizeAll } from '@/utils/text/textUtils';

const LIMIT = 4;

export const Interviewers = memo(() => {
  const { interviewersType, setInterviewersType } = useSchedulingAnalytics();
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle>Interviewers</CardTitle>
        <Tabs value={interviewersType} onValueChange={setInterviewersType}>
          <TabsList>
            <TabsTrigger value='qualified'>Qualified</TabsTrigger>
            <TabsTrigger value='training'>Trainee</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <Container />
      </CardContent>
    </Card>
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
        <div
          key={user_id}
          className='flex cursor-pointer flex-row items-center justify-between hover:bg-gray-100'
        >
          <div className='flex w-full flex-row items-center justify-between px-4 py-2'>
            <span className='flex-grow text-sm font-medium'>
              {capitalizeAll(name)}
            </span>
            <span className='px-2 text-sm text-gray-600'>{accepted}</span>
            <span className='px-2 text-sm text-gray-600'>{declined}</span>
            <span className='px-2 text-sm text-gray-600'>--</span>
          </div>
        </div>
      ))}
    </>
  );
};

const Loader = memo(() => {
  return [...new Array(Math.trunc(Math.random() * (LIMIT - 1)) + 1)].map(
    (_, i) => <Skeleton key={i} className='h-full w-full' />,
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
