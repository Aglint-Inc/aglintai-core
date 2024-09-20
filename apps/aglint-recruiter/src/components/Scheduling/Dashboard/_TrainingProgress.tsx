import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { HistoryPillShadcn } from '@/components/Common/Member/HistoryPill';
import { useInterviewTrainingProgress } from '@/queries/scheduling-dashboard';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

const LIMIT = 4;

const TrainingProgress = () => {
  const { push } = useRouter();
  const { data } = useInterviewTrainingProgress();
  return (
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Training Progress</CardTitle>
        {!!data && data.length !== 0 && (
          <Link
            href={`${ROUTES['/scheduling']()}?tab=interviewtypes`}
            className='text-blue-600 transition-colors hover:text-blue-800'
            onClick={() =>
              push(`${ROUTES['/scheduling']()}?tab=interviewtypes`)
            }
          >
            View All Interviewers
          </Link>
        )}
      </CardHeader>
      <CardContent>
        <TrainingProgressComponent />
      </CardContent>
    </Card>
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
      (_, i) => <Skeleton key={i} className='h-full w-full' />,
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
          <Link href={`/user/${user_id}`}>
            <div className='flex items-center space-x-4 rounded-lg p-4 transition-colors duration-200 hover:bg-gray-50'>
              <div className='flex-shrink-0'>
                <Avatar className='h-10 w-10'>
                  <AvatarImage
                    src={profile_image}
                    alt={capitalizeAll(getFullName(first_name, last_name))}
                  />
                  <AvatarFallback>
                    {getInitials(first_name, last_name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className='flex-grow'>
                <Link
                  href={`/user/${user_id}`}
                  className='text-sm font-medium text-gray-900 hover:underline'
                >
                  {capitalizeAll(getFullName(first_name, last_name))}
                </Link>
                <p className='text-sm text-gray-500'>{position}</p>
                <p className='mt-1 text-xs text-gray-400'>{module.name}</p>
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

export function getInitials(firstName, lastName) {
  if (!firstName) return '';
  if (!lastName) {
    return firstName.substring(0, 2).toUpperCase();
  }
  return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
}
