import { Avatar, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { memo } from 'react';

import { HistoryPill } from '@/devlink3/HistoryPill';
import { TrainingProgress as TrainingProgressDev } from '@/devlink3/TrainingProgress';
import { TrainingProgressList } from '@/devlink3/TrainingProgressList';
import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/src/context/SchedulingAnalytics';
import ROUTES from '@/src/utils/routing/routes';

import Loader from '../../Common/Loader';

export const TrainingProgress = memo(() => {
  const { push } = useRouter();
  const {
    leaderboard: { data, status },
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
      <TrainingProgressDev
        onClickViewAllInterviewers={{
          onClick: () => push(`${ROUTES['/scheduling']()}?tab=interviewtypes`),
        }}
        isViewAllVisible={!!data && data.length !== 0}
        slotTrainingProgressList={<List data={data} />}
      />
    </Stack>
  );
});
TrainingProgress.displayName = 'TrainingProgress';

type Props = Pick<SchedulingAnalyticsContextType['training_progress'], 'data'>;

const List = ({ data }: Props) => {
  return (
    <>
      {(data ?? []).map((data) => (
        <Stack
          key={data.user_id}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'var(--neutral-3)',
            },
          }}
        >
          <TrainingProgressList
            slotHistoryPill={<Pills {...data} />}
            slotInterviewerImage={
              <Avatar
                // src={data.}
                alt={data.name}
                variant='rounded-medium'
              />
            }
            textInterviewModule={''}
            textName={data.name}
            textRole={data.position}
          />
        </Stack>
      ))}
    </>
  );
};

const Pills = ({
  noreverseshadow,
  noshadow,
  number_of_reverse_shadow,
  number_of_shadow,
}: Pick<
  Props['data'][number],
  | 'noreverseshadow'
  | 'noshadow'
  | 'number_of_reverse_shadow'
  | 'number_of_shadow'
>) => {
  const pillData = [
    ...[...new Array(number_of_shadow)].map(() => ({
      shadow: true,
      active: true,
    })),
    ...[...new Array(noshadow - number_of_shadow)].map(() => ({
      shadow: true,
      active: true,
    })),
    ...[...new Array(number_of_reverse_shadow)].map(() => ({
      shadow: true,
      active: true,
    })),
    ...[...new Array(noreverseshadow - number_of_shadow)].map(() => ({
      shadow: true,
      active: true,
    })),
  ] satisfies { shadow: boolean; active: boolean }[];

  return (
    <>
      {pillData.map(({ active, shadow }, index) => (
        <HistoryPill
          key={index}
          isActive={active}
          isShadow={shadow}
          isReverseShadow={!shadow}
          position={
            index === 0 ? 'start' : index === pillData.length ? 'end' : ''
          }
        />
      ))}
    </>
  );
};
