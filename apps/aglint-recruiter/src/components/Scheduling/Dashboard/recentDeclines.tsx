import { RecentDeclineList } from '@devlink3/RecentDeclineList';
import { RecentDeclines as RecentDeclinesDev } from '@devlink3/RecentDeclines';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';

import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/context/SchedulingAnalytics';
import { capitalizeAll } from '@/utils/text/textUtils';

import { Empty } from './common';

const LIMIT = 4;

export const RecentDeclines = memo(() => (
  <RecentDeclinesDev slotRecentDeclineList={<Container />} />
));
RecentDeclines.displayName = 'RecentDeclines';

const Container = memo(() => {
  const {
    recent_decline_reschedule: { data: d, status },
  } = useSchedulingAnalytics();

  if (status === 'pending')
    return (
      <div className='flex items-center justify-center h-[350px]'>
        <Loader2 className='w-8 h-8 animate-spin text-gray-400' />
      </div>
    );

  if (status === 'error') return <>Error</>;

  const data = (d ?? []).filter(({ type }) => type === 'declined');

  if (data.length === 0)
    return (
      <Stack>
        <Empty />
      </Stack>
    );

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
          textName={capitalizeAll(name)}
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
        key={i}
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
