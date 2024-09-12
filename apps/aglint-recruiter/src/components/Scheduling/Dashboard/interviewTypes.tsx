import { Skeleton } from '@components/ui/skeleton';
import Stack from '@mui/material/Stack';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';
import { memo } from 'react';

import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/context/SchedulingAnalytics';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

import { InterviewModuleStats } from '../Common/InterviewType/InterviewModulesStats.';
import { Empty } from './common';
import { InterviewStatsLoader } from './interviewers';

const LIMIT = 6;

export const InterviewTypes = memo(() => {
  const { push } = useRouter();
  const {
    interview_types: { data },
  } = useSchedulingAnalytics();
  return (
    <>
      <InterviewModuleStats
        onClickViewAllModules={() =>
          push(`${ROUTES['/scheduling']()}?tab=interviewtypes`)
        }
        isViewAllVisible={(data ?? []).length > LIMIT}
        slotInterviewModuleStatsCard={<Container />}
      />
    </>
  );
});
InterviewTypes.displayName = 'InterviewTypes';

const Container = memo(() => {
  const {
    interview_types: { data, status },
  } = useSchedulingAnalytics();

  if (status === 'pending')
    return (
      <div className='flex items-center justify-center h-[350px]'>
        <Loader2 className='w-8 h-8 animate-spin text-gray-400' />
      </div>
    );

  if (status === 'error') return <>Error</>;

  if (data.length === 0)
    return (
      <Stack>
        <Empty />
      </Stack>
    );

  return <List data={data} />;
});
Container.displayName = 'Container';

type Props = Pick<SchedulingAnalyticsContextType['interview_types'], 'data'>;

const List = memo(({ data }: Props) => {
  return (
    <>
      {(data ?? []).map(({ id, name, qualified, training }) => (
        <>
          <div
            key={id}
            className='grid grid-cols-[60%_20%_20%] border-b border-[#eaf1f3] bg-white hover:bg-neutral-100 cursor-pointer transition-colors duration-200'
          >
            <div className='p-2 px-4'>
              <span>{capitalizeAll(name)}</span>
            </div>
            <div className='p-2 px-4'>
              <span>{qualified}</span>
            </div>
            <div className='p-2 px-4'>
              <span>{training}</span>
            </div>
          </div>
        </>
      ))}
    </>
  );
});
List.displayName = 'List';

const Loader = memo(() => {
  return [...new Array(Math.trunc(Math.random() * (LIMIT - 1)) + 1)].map(
    (_, i) => (
      <InterviewStatsLoader
        key={i}
        slotSkeleton={<Skeleton className='w-full h-full' />}
      />
    ),
  );
});
Loader.displayName = 'Loader';
