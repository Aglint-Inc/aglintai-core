import Avatar from '@mui/material/Avatar';
import { useRouter } from 'next/router';
import { memo } from 'react';

import { RecentDeclines as RecentDeclinesDev } from '@/devlink3/RecentDeclines';
import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/src/context/SchedulingAnalytics';

import { Empty } from './common';
import { RecentDeclineList } from '@/devlink3/RecentDeclineList';
import Loader from '../../Common/Loader';

export const RecentDeclines = memo(() => (
  <RecentDeclinesDev slotRecentDeclineList={<Container />} />
));
RecentDeclines.displayName = 'RecentDeclines';

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
  ].filter(({ type }) => type === 'declined');

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
          textDesc={note}
          textName={name}
          textTime={''}
        />
      ))}
    </>
  );
});
List.displayName = 'List';
