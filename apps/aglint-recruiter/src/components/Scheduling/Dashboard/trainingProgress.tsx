import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
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
    <Card className='w-full'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Training Progress</CardTitle>
        {(data ?? []).length > LIMIT && (
          <Button
            variant='ghost'
            onClick={() =>
              push(`${ROUTES['/scheduling']()}?tab=interviewtypes`)
            }
          >
            View All Interviewers
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Containter />
      </CardContent>
    </Card>
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
      <div className='flex flex-col'>
        <Empty />
      </div>
    );

  return <List data={data} />;
};

const List = memo(({ data }: Props) => {
  return (
    <>
      {(data ?? []).map((data) => (
        <div key={data.user_id} className='cursor-pointer hover:bg-neutral-200'>
          <div className='flex items-center space-x-4 p-4'>
            <Avatar>
              <AvatarImage src={data.profile_image} alt={data.name} />
              <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <p className='text-sm font-medium'>{capitalizeAll(data.name)}</p>
              <p className='text-sm text-muted-foreground'>{data.position}</p>
            </div>
            <Pills {...data} />
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
    (_, i) => <Skeleton key={i} />,
  );
});
Loader.displayName = 'Loader';
