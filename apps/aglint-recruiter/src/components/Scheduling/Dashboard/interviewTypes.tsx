import { Skeleton } from '@components/ui/skeleton';
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
      <div className='flex h-[350px] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
      </div>
    );

  if (status === 'error') return <>Error</>;

  if (data.length === 0)
    return (
      <div className='flex flex-col'>
        <Empty />
      </div>
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
            className='grid cursor-pointer grid-cols-[60%_20%_20%] border-b border-[#eaf1f3] bg-white transition-colors duration-200 hover:bg-neutral-100'
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
    (_, i) => <Skeleton key={i} className='h-full w-full' />,
  );
});
Loader.displayName = 'Loader';
