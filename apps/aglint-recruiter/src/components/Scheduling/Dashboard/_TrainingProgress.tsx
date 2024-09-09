import { HistoryPill as HistoryPillDev } from '@devlink3/HistoryPill';
import { NoData } from '@devlink3/NoData';
import { TrainingProgress as TrainingProgressDev } from '@devlink3/TrainingProgress';
import { TrainingProgressList } from '@devlink3/TrainingProgressList';
import { TrainingProgressLoader } from '@devlink3/TrainingProgressLoader';
import { Avatar } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { useInterviewTrainingProgress } from '@/queries/scheduling-dashboard';
import { getFullName } from '@/utils/jsonResume';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';
import { Skeleton } from '@components/ui/skeleton';

const LIMIT = 4;

const TrainingProgress = () => {
  const { push } = useRouter();
  const { data } = useInterviewTrainingProgress();
  return (
    <TrainingProgressDev
      onClickViewAllInterviewers={{
        onClick: () => push(`${ROUTES['/scheduling']()}?tab=interviewtypes`),
      }}
      isViewAllVisible={!!data && data.length !== 0}
      slotTrainingProgressList={<TrainingProgressComponent />}
    />
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
      (_, i) => (
        <TrainingProgressLoader
          key={i}
          slotSkeleton={<Skeleton className='w-full h-full' />}
        />
      ),
    );

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return <NoData />;

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
            <TrainingProgressList
              key={module.id + user_id}
              slotHistoryPill={<HistoryPills count={count} module={module} />}
              slotInterviewerImage={
                <Avatar
                  src={profile_image}
                  alt={capitalizeAll(getFullName(first_name, last_name))}
                  variant='rounded-medium'
                />
              }
              textInterviewModule={module.name}
              textName={
                <Link href={`/user/profile/${user_id}`}>
                  {capitalizeAll(getFullName(first_name, last_name))}
                </Link>
              }
              textRole={position}
            />
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
        <HistoryPillDev
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
  ].reduce((acc, curr, i) => {
    const index = i + (shadowPills || []).length;
    const isActive = index < reverse_shadow;
    const isStart = module.settings.noShadow + index === 0;
    const isEnd =
      index === module.settings.noShadow + module.settings.noReverseShadow - 1;

    acc.push(
      <HistoryPillDev
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
