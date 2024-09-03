import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import { memo, useMemo } from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { Skeleton } from '@/devlink2/Skeleton';
import { HistoryPill } from '@/devlink3/HistoryPill';
import { TrainingProgress as TrainingProgressDev } from '@/devlink3/TrainingProgress';
import { TrainingProgressList } from '@/devlink3/TrainingProgressList';
import { TrainingProgressLoader } from '@/devlink3/TrainingProgressLoader';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { type useTrainingProgressType,useTrainingProgress } from '../Hook';

const LIMIT = 4;

export const TrainingProgress = memo(() => {
  const { push } = useRouter();
  //   const {
  //     training_progress: { data },
  //   } = useSchedulingAnalytics();

  const { data } = useTrainingProgress({});
  return (
    <Stack width={'100%'}>
      <TrainingProgressDev
        onClickViewAllInterviewers={{
          onClick: () => push(`${ROUTES['/scheduling']()}?tab=interviewtypes`),
        }}
        isViewAllVisible={(data ?? []).length > LIMIT}
        // slotTrainingProgressList={<>hellow</>}
        slotTrainingProgressList={<Containter />}
      />
    </Stack>
  );
});
TrainingProgress.displayName = 'TrainingProgress';

const Containter = () => {
  const { data, status } = useTrainingProgress({});

  if (status === 'pending') return <Loader />;

  if (status === 'error') return <>Error</>;

  if (data.length === 0)
    return (
      <Stack>
        <GlobalEmptyState
          iconName={'monitoring'}
          size={8}
          textDesc={'No Data Available'}
        />
      </Stack>
    );

  return <List data={data} />;
};

const List = memo(({ data }: { data: useTrainingProgressType }) => {
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
                //src={data.}
                alt={data.name}
                variant='rounded-medium'
              />
            }
            textInterviewModule={''}
            textName={capitalizeAll(data.name)}
            textRole={data.position}
          />
        </Stack>
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
    useTrainingProgressType[number],
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
          <HistoryPill
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
