import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import { memo } from 'react';

import { Skeleton } from '@/devlink2/Skeleton';
import { InterviewModuleStats } from '@/devlink3/InterviewModuleStats';
import { InterviewModuleStatsCard } from '@/devlink3/InterviewModuleStatsCard';
import { InterviewStatsLoader } from '@/devlink3/InterviewStatsLoader';
import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/src/context/SchedulingAnalytics';
import ROUTES from '@/src/utils/routing/routes';

import { Empty } from './common';

const LIMIT = 6;

export const InterviewTypes = memo(() => {
  const { push } = useRouter();
  const {
    interview_types: { data },
  } = useSchedulingAnalytics();
  return (
    <InterviewModuleStats
      onClickViewAllModules={{
        onClick: () => push(`${ROUTES['/scheduling']()}?tab=interviewtypes`),
      }}
      isViewAllVisible={(data ?? []).length > LIMIT}
      slotInterviewModuleStatsCard={<Container />}
    />
  );
});
InterviewTypes.displayName = 'InterviewTypes';

const Container = memo(() => {
  const {
    interview_types: { data: d, status },
  } = useSchedulingAnalytics();

  const data = [
    ...(d ?? []),
    {
      id: 'abc',
      name: 'abc',
      training: 3,
      qualified: 4,
    },
  ];

  if (status === 'pending') return <Loader />;

  if (status === 'error') return <>Error</>;

  if (data.length === 0) return <Empty />;

  return <List data={data} />;
});
Container.displayName = 'Container';

type Props = Pick<SchedulingAnalyticsContextType['interview_types'], 'data'>;

const List = memo(({ data }: Props) => {
  const { push } = useRouter();
  return (
    <>
      {(data ?? []).map(({ id, name, qualified, training }) => (
        <Stack
          key={id}
          onClick={() =>
            push(
              `${ROUTES['/scheduling/interview-types/[type_id]']({ type_id: id })}`,
            )
          }
          sx={{
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'var(--neutral-3)',
            },
          }}
        >
          <InterviewModuleStatsCard
            textInterviewModule={name}
            textQualifiedMember={qualified}
            textTraining={training}
          />
        </Stack>
      ))}
    </>
  );
});
List.displayName = 'List';

const Loader = memo(() => {
  return [...new Array(Math.trunc(Math.random() * (LIMIT - 1)) + 1)].map(
    (_, i) => <InterviewStatsLoader key={i} slotSkeleton={<Skeleton />} />,
  );
});
Loader.displayName = 'Loader';
