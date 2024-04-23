import { Avatar } from '@mui/material';
import React from 'react';

import {
  HistoryPill as HistoryPillDev,
  TrainingProgress as TrainingProgressDev,
  TrainingProgressList,
} from '@/devlink3';
import { useInterviewTrainingProgress } from '@/src/queries/scheduling-dashboard';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeAll } from '@/src/utils/text/textUtils';

const TrainingProgress = () => {
  const { data, status } = useInterviewTrainingProgress();

  if (status === 'error') return <>Error</>;

  if (status === 'pending') return <>Loading...</>;

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return <>Empty</>;

  return <TrainingProgressComponent interviewTrainingProgress={data} />;
};

export default TrainingProgress;

type TrainigProgressProps = {
  interviewTrainingProgress: ReturnType<
    typeof useInterviewTrainingProgress
  >['data'];
};

const TrainingProgressComponent = ({
  interviewTrainingProgress,
}: TrainigProgressProps) => {
  const rows = interviewTrainingProgress.map(
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
      <TrainingProgressList
        key={module.id + user_id}
        slotHistoryPill={<HistoryPills count={count} module={module} />}
        slotInterviewerImage={
          <Avatar
            src={profile_image}
            alt={capitalizeAll(getFullName(first_name, last_name))}
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        }
        textInterviewModule={module.name}
        textName={capitalizeAll(getFullName(first_name, last_name))}
        textRole={position}
      />
    ),
  );
  return <TrainingProgressDev slotTrainingProgressList={rows} />;
};

const HistoryPills = ({
  count: { reverse_shadow, shadow },
  module,
}: Pick<
  TrainigProgressProps['interviewTrainingProgress'][number],
  'module' | 'count'
>) => {
  const shadowPills = [...new Array(module.settings.noShadow)].reduce(
    (acc, curr, index) => {
      acc.push(
        <HistoryPillDev
          key={index}
          isActive={index < shadow}
          isReverseShadow={false}
          isShadow={true}
        />,
      );
      return acc;
    },
    [] as React.JSX.Element[],
  );
  const reverseShadowPills = [
    ...new Array(module.settings.noReverseShadow),
  ].reduce((acc, curr, index) => {
    acc.push(
      <HistoryPillDev
        key={index}
        isActive={index < reverse_shadow}
        isReverseShadow={true}
        isShadow={false}
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
