import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import { memo } from 'react';

import { InterviewModuleStats } from '@/devlink3/InterviewModuleStats';
import { InterviewModuleStatsCard } from '@/devlink3/InterviewModuleStatsCard';
import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/src/context/SchedulingAnalytics';
import ROUTES from '@/src/utils/routing/routes';

import Loader from '../../Common/Loader';

export const InterviewTypes = memo(() => {
  const { push } = useRouter();
  const {
    interview_types: { data, status },
  } = useSchedulingAnalytics();
  if (status === 'error') return <>Error</>;
  if (status === 'pending')
    return (
      <Stack style={{ height: '500px', width: '100%' }}>
        <Loader />
      </Stack>
    );
  return (
    <Stack style={{ height: '500px', width: '100%' }}>
      <InterviewModuleStats
        onClickViewAllModules={{
          onClick: () => push(`${ROUTES['/scheduling']()}?tab=interviewtypes`),
        }}
        isViewAllVisible={!!data && data.length !== 0}
        slotInterviewModuleStatsCard={<List data={data} />}
      />
    </Stack>
  );
});
InterviewTypes.displayName = 'InterviewTypes';

type Props = Pick<SchedulingAnalyticsContextType['interview_types'], 'data'>;

const List = ({ data }: Props) => {
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
};
