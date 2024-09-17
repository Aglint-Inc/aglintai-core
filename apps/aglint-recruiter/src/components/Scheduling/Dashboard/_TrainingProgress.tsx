import { Skeleton } from '@components/ui/skeleton';
import { Avatar } from '@mui/material';
import { BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { HistoryPillShadcn } from '@/components/Common/Member/HistoryPill';
import { useInterviewTrainingProgress } from '@/queries/scheduling-dashboard';
import { getFullName } from '@/utils/jsonResume';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

const LIMIT = 4;

const TrainingProgress = () => {
  const { push } = useRouter();
  const { data } = useInterviewTrainingProgress();
  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Training Progress</h2>
        {!!data && data.length !== 0 && (
          <Link
            href={`${ROUTES['/scheduling']()}?tab=interviewtypes`}
            className='text-blue-600 hover:text-blue-800 transition-colors'
            onClick={() =>
              push(`${ROUTES['/scheduling']()}?tab=interviewtypes`)
            }
          >
            View All Interviewers
          </Link>
        )}
      </div>
      <div className='bg-white shadow rounded-lg p-4'>
        <TrainingProgressComponent />
      </div>
    </div>
  );
};

export default TrainingProgress;

type TrainigProgressProps = {
  interviewTrainingProgress: ReturnType<
    typeof useInterviewTrainingProgress
  >['data'];
};

const TrainingProgressComponent = () => {
  const { data, status } = useInterviewTrainingProgress();

  if (status === 'pending')
    return [...new Array(Math.trunc(Math.random() * (LIMIT - 1)) + 1)].map(
<<<<<<< HEAD
      (_, i) => <Skeleton key={i} className='w-full h-full' />,
=======
      (_, i) => (
        <TrainingProgressLoader
          key={i}
          slotSkeleton={<Skeleton className='h-full w-full' />}
        />
      ),
>>>>>>> 8eb6ea7dfa37de2bebc9079affacd757345fc96f
    );

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return (
      <div className='h-[296px]'>
        <div className='flex h-full flex-col items-center justify-center'>
          <BarChart2 className='h-12 w-12 text-gray-400' />
          <p className='mt-2 text-sm text-gray-500'>No data available</p>
        </div>
      </div>
    );

  const rows = data
    .slice(0, LIMIT)
    .map(
      ({
        recruiter_user: {
          user_id,
          first_name,
          last_name,
          profile_image,
          position,
        },
        module,
        count,
      }) => (
        <>
          <Link href={`/user/profile/${user_id}`}>
            <div className='flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200'>
              <div className='flex-shrink-0'>
                <Avatar
                  src={profile_image}
                  alt={capitalizeAll(getFullName(first_name, last_name))}
                  className='w-10 h-10'
                />
              </div>
              <div className='flex-grow'>
                <Link
                  href={`/user/profile/${user_id}`}
                  className='text-sm font-medium text-gray-900 hover:underline'
                >
                  {capitalizeAll(getFullName(first_name, last_name))}
                </Link>
                <p className='text-sm text-gray-500'>{position}</p>
                <p className='text-xs text-gray-400 mt-1'>{module.name}</p>
              </div>
              <div className='flex-shrink-0'>
                <HistoryPills count={count} module={module} />
              </div>
            </div>
          </Link>
        </>
      ),
    );

  return <>{rows}</>;
};

const HistoryPills = ({
  count: { reverse_shadow, shadow },
  module,
}: Pick<
  TrainigProgressProps['interviewTrainingProgress'][number],
  'module' | 'count'
>) => {
  const shadowPills = [...new Array(module.settings.noShadow)].reduce(
    (acc, _curr, index) => {
      const isActive = index < shadow;
      const isStart = index === 0;
      const isEnd =
        index ===
        module.settings.noShadow + module.settings.noReverseShadow - 1;
      acc.push(
        <HistoryPillShadcn
          key={index}
          isActive={isActive}
          isShadow={true}
          isReverseShadow={false}
          position={isStart ? 'start' : isEnd ? 'end' : ''}
        />,
      );
      return acc;
    },
    [] as React.JSX.Element[],
  );
  const reverseShadowPills = [
    ...new Array(module.settings.noReverseShadow),
  ].reduce((acc, _curr, i) => {
    const index = i + (shadowPills || []).length;
    const isActive = index < reverse_shadow;
    const isStart = module.settings.noShadow + index === 0;
    const isEnd =
      index === module.settings.noShadow + module.settings.noReverseShadow - 1;

    acc.push(
      <HistoryPillShadcn
        key={index}
        isActive={isActive}
        isShadow={false}
        isReverseShadow={true}
        position={isStart ? 'start' : isEnd ? 'end' : ''}
      />,
    );
    return acc;
  }, [] as React.JSX.Element[]);
  return (
    <>
      {shadowPills}
      {reverseShadowPills}
    </>
  );
};
