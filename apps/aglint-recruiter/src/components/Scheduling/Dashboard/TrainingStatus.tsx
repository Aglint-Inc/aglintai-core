import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { Skeleton } from '@/devlink2/Skeleton';
import { InterviewModuleStats } from '@/devlink3/InterviewModuleStats';
import { InterviewModuleStatsCard } from '@/devlink3/InterviewModuleStatsCard';
import { InterviewStatsLoader } from '@/devlink3/InterviewStatsLoader';
import { NoData } from '@/devlink3/NoData';
import { useInterviewTrainingStatus } from '@/src/queries/scheduling-dashboard';
import ROUTES from '@/src/utils/routing/routes';

const LIMIT = 6;

const TrainingStatus = () => {
  const { push } = useRouter();
  const { data } = useInterviewTrainingStatus();
  return (
    <InterviewModuleStats
      onClickViewAllModules={{
        onClick: () => push(`${ROUTES['/scheduling']()}?tab=interviewtypes`),
      }}
      isViewAllVisible={!!data && data.length !== 0}
      slotInterviewModuleStatsCard={<TrainingStatusComponent />}
    />
  );
};

export default TrainingStatus;

const TrainingStatusComponent = () => {
  const { data, status } = useInterviewTrainingStatus();

  const router = useRouter();

  if (status === 'pending')
    return [...new Array(Math.trunc(Math.random() * (LIMIT - 1)) + 1)].map(
      (_, i) => <InterviewStatsLoader key={i} slotSkeleton={<Skeleton />} />,
    );

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return <NoData />;

  const rows = data
    .slice(0, LIMIT)
    .map(({ id, name, training_status_count: { qualified, training } }) => (
      <Stack
        key={id}
        onClick={() =>
          router.push(
            `${ROUTES['/scheduling/interview-types/[type_id]']({ type_id: id })}`,
          )
        }
        sx={{
          cursor: 'pointer',
          ': hover': {
            backgroundColor: 'var(--neutral-3)',
          },
        }}
        // scheduling/module/members/0f337bba-fd0b-41ed-b356-408d9c4a8b5c
      >
        <InterviewModuleStatsCard
          textInterviewModule={name}
          textQualifiedMember={qualified}
          textTraining={training}
        />
      </Stack>
    ));
  return <>{rows}</>;
};
