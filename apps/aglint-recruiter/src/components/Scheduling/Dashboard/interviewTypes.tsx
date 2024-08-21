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
import { capitalizeAll } from '@/src/utils/text/textUtils';

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
    interview_types: { data, status },
  } = useSchedulingAnalytics();

  if (status === 'pending') return <Loader />;

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
        <InterviewModuleStatsCard
          key={id}
          textInterviewModule={capitalizeAll(name)}
          textQualifiedMember={qualified}
          textTraining={training}
        />
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
