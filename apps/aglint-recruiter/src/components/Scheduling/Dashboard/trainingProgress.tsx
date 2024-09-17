import { Skeleton } from '@components/ui/skeleton';
import { TrainingProgress as TrainingProgressDev } from '@devlink3/TrainingProgress';
import { TrainingProgressList } from '@devlink3/TrainingProgressList';
import { TrainingProgressLoader } from '@devlink3/TrainingProgressLoader';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';

import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/context/SchedulingAnalytics';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

import { HistoryPillShadcn } from '../../Common/Member/HistoryPill';
import { Empty } from './common';

const LIMIT = 4;

export const TrainingProgress = memo(() => {
  const { push } = useRouter();
  const {
    training_progress: { data },
  } = useSchedulingAnalytics();
  return (
    <Stack width={'100%'}>
      <TrainingProgressDev
        onClickViewAllInterviewers={{
          onClick: () => push(`${ROUTES['/scheduling']()}?tab=interviewtypes`),
        }}
        isViewAllVisible={(data ?? []).length > LIMIT}
        slotTrainingProgressList={<Containter />}
      />
    </Stack>
  );
});
TrainingProgress.displayName = 'TrainingProgress';

type Props = Pick<SchedulingAnalyticsContextType['training_progress'], 'data'>;

const Containter = () => {
  const {
    training_progress: { data, status },
  } = useSchedulingAnalytics();

  if (status === 'pending')
    return (
      <div className='flex h-[350px] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
      </div>
    );

  if (status === 'error') return <>Error</>;

  if (data.length === 0)
    return (
      <Stack>
        <Empty />
      </Stack>
    );

  return <List data={data} />;
};

const List = memo(({ data }: Props) => {
  return (
    <>
      {(data ?? []).map((data) => (
        <div
          key={data.user_id}
          className='cursor-pointer hover:bg-[var(--neutral-3)]'
        >
          <TrainingProgressList
            slotHistoryPill={<Pills {...data} />}
            slotInterviewerImage={<Avatar alt={data.name} />}
            textInterviewModule={''}
            textName={capitalizeAll(data.name)}
            textRole={data.position}
          />
        </div>
      ))}
    </>
  );
});
List.displayName = 'List';

const Pills = memo(
  ({
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
    const pillData = useMemo(
      () =>
        [
          ...[...new Array(number_of_shadow)].map(() => ({
            shadow: true,
            active: true,
          })),
          ...[...new Array(noshadow - number_of_shadow)].map(() => ({
            shadow: true,
            active: false,
          })),
          ...[...new Array(number_of_reverse_shadow)].map(() => ({
            shadow: false,
            active: true,
          })),
          ...[...new Array(noreverseshadow - number_of_reverse_shadow)].map(
            () => ({
              shadow: false,
              active: false,
            }),
          ),
        ] satisfies { shadow: boolean; active: boolean }[],
      [number_of_shadow, noshadow, number_of_reverse_shadow, number_of_shadow],
    );

    const maxLength = useMemo(() => pillData.length, [pillData]);

    return (
      <>
        {pillData.map(({ active, shadow }, index) => (
          <HistoryPillShadcn
            key={index}
            isActive={active}
            isShadow={shadow}
            isReverseShadow={!shadow}
            position={
              index === 0 ? 'start' : index === maxLength - 1 ? 'end' : ''
            }
          />
        ))}
      </>
    );
  },
);
Pills.displayName = 'Pills';

const Loader = memo(() => {
  return [...new Array(Math.trunc(Math.random() * (LIMIT - 1)) + 1)].map(
    (_, i) => <TrainingProgressLoader key={i} slotSkeleton={<Skeleton />} />,
  );
});
Loader.displayName = 'Loader';
