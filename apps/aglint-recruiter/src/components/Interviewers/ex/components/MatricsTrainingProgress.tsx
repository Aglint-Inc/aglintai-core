import { Skeleton } from '@components/ui/skeleton';
import Avatar from '@mui/material/Avatar';
import { HardDrive } from 'lucide-react';
import Link from 'next/link';
import { memo, useMemo } from 'react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { HistoryPillShadcn } from '@/components/Common/Member/HistoryPill';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

import { useTrainingProgress, type useTrainingProgressType } from '../Hook';

const LIMIT = 4;

export const TrainingProgress = memo(() => {
  const { data } = useTrainingProgress({});
  return (
    <div className='w-full'>
      <div className='w-full'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Training Progress</h2>
          {(data ?? []).length > LIMIT && (
            <Link
              href={`${ROUTES['/scheduling']()}?tab=interviewtypes`}
              className='text-blue-600 transition-colors hover:text-blue-800'
            >
              View All Interviewers
            </Link>
          )}
        </div>
        <div className='rounded-lg bg-white p-4 shadow'>
          <Containter />
        </div>
      </div>
    </div>
  );
});
TrainingProgress.displayName = 'TrainingProgress';

const Containter = () => {
  const { data, status } = useTrainingProgress({});

  if (status === 'pending') return <Loader />;

  if (status === 'error') return <>Error</>;

  if (data.length === 0)
    return <GlobalEmpty iconSlot={<HardDrive />} text={'No Data Available'} />;

  return <List data={data} />;
};

const List = memo(({ data }: { data: useTrainingProgressType }) => {
  return (
    <>
      {(data ?? []).map((data) => (
        <div
          key={data.user_id}
          className='cursor-pointer rounded-lg p-4 transition-colors duration-200 hover:bg-neutral-100'
        >
          <div className='flex items-center space-x-4'>
            <Avatar alt={data.name} />
            <div className='flex-grow'>
              <h3 className='font-medium'>{capitalizeAll(data.name)}</h3>
              <p className='text-sm text-gray-500'>{data.position}</p>
            </div>
            <div className='flex-shrink-0'>
              <Pills {...data} />
            </div>
          </div>
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
    (_, i) => <Skeleton key={i} />,
  );
});
Loader.displayName = 'Loader';
