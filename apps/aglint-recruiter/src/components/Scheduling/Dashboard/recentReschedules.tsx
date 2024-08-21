import Avatar from '@mui/material/Avatar';
import { memo } from 'react';

import { RecentReschedule as RecentRescheduleDev } from '@/devlink3/RecentReschedule';
import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/src/context/SchedulingAnalytics';

import { Empty } from './common';
import { RecentDeclineList } from '@/devlink3/RecentDeclineList';
import Skeleton from '@mui/material/Skeleton';

const LIMIT = 4;

export const RecentReschedules = memo(() => (
  <RecentRescheduleDev slotRecentRescheduleList={<Container />} />
));
RecentReschedules.displayName = 'RecentReschedules';

const Container = memo(() => {
  const {
    recent_decline_reschedule: { data: d, status },
  } = useSchedulingAnalytics();

  const data = [
    ...(d ?? []),
    {
      id: 'abc',
      name: 'abc',
      note: 'abc',
      type: 'reschedule' as const,
      profile_image: null as string,
    },
  ].filter(({ type }) => type === 'reschedule');

  if (status === 'pending') return <Loader />;

  if (status === 'error') return <>Error</>;

  if (data.length === 0) return <Empty />;

  return <List data={data} />;
});
Container.displayName = 'Container';

type Props = Pick<
  SchedulingAnalyticsContextType['recent_decline_reschedule'],
  'data'
>;

const List = memo(({ data }: Props) => {
  return (
    <>
      {(data ?? []).map(({ id, name, note, profile_image }) => (
        <RecentDeclineList
          key={id}
          slotImage={
            <Avatar src={profile_image} alt={name} variant='rounded-medium' />
          }
          textDesc={note?.trim() || '---'}
          textName={name}
          textTime={''}
        />
      ))}
    </>
  );
});
List.displayName = 'List';

const Loader = memo(() => {
  return [...new Array(Math.trunc(Math.random() * (LIMIT - 1)) + 1)].map(
    (_, i) => (
      <RecentDeclineList
        slotImage={
          <Skeleton variant='circular' width={'100%'} height={'100%'} />
        }
        textName={
          <Skeleton variant='text' width={'100px'} height={'var(--space-6)'} />
        }
        textTime={
          <Skeleton variant='text' width={'50px'} height={'var(--space-6)'} />
        }
        textDesc={
          <Skeleton variant='text' width={'200px'} height={'var(--space-6)'} />
        }
      />
    ),
  );
});
Loader.displayName = 'Loader';
