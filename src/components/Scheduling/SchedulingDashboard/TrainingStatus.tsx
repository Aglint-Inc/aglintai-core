import { useRouter } from 'next/router';

import { Skeleton } from '@/devlink2';
import {
  InterviewModuleStats,
  InterviewModuleStatsCard,
  InterviewStatsLoader,
  NoData,
} from '@/devlink3';
import { useInterviewTrainingStatus } from '@/src/queries/scheduling-dashboard';
import { pageRoutes } from '@/src/utils/pageRouting';

const LIMIT = 6;

const TrainingStatus = () => {
  const { push } = useRouter();
  const { data } = useInterviewTrainingStatus();
  return (
    <InterviewModuleStats
      onClickViewAllModules={{
        onClick: () => push(`${pageRoutes.SCHEDULING}?tab=interviewers`),
      }}
      isViewAllVisible={!!data && data.length !== 0}
      slotInterviewModuleStatsCard={<TrainingStatusComponent />}
    />
  );
};

export default TrainingStatus;

const TrainingStatusComponent = () => {
  const { data, status } = useInterviewTrainingStatus();

  if (status === 'pending')
    return [...new Array(Math.trunc(Math.random() * (LIMIT - 1)) + 1)].map(
      (_, i) => <InterviewStatsLoader key={i} slotSkeleton={<Skeleton />} />,
    );

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return <NoData />;

  const rows = data
    .slice(0, LIMIT)
    .map(({ id, name, training_status_count: { qualified, training } }) => (
      <InterviewModuleStatsCard
        key={id}
        textInterviewModule={name}
        textQualifiedMember={qualified}
        textTraining={training}
      />
    ));
  return <>{rows}</>;
};
