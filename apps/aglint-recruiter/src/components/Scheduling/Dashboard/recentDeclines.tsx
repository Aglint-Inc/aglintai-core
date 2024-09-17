import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Loader2 } from 'lucide-react';
import { memo } from 'react';

import UITypography from '@/components/Common/UITypography';
import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/context/SchedulingAnalytics';
import { capitalizeAll } from '@/utils/text/textUtils';

import { Empty } from './common';

const LIMIT = 4;

export const RecentDeclines = memo(() => (
  <div className='h-[450px] overflow-hidden rounded-md border border-gray-200'>
    <div className='border-b border-gray-200 bg-gray-100 p-3'>
      <UITypography type='small' fontBold='normal' color='black'>
        Recent Decline
      </UITypography>
    </div>
    <div className='flex flex-col'>
      <Container />
    </div>
  </div>
));
RecentDeclines.displayName = 'RecentDeclines';

const Container = memo(() => {
  const {
    recent_decline_reschedule: { data: d, status },
  } = useSchedulingAnalytics();

  if (status === 'pending')
    return (
      <div className='flex h-[350px] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
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
        <div key={id} className='flex items-center space-x-4 p-4'>
          <div className='flex-shrink-0'>
            <Avatar src={profile_image} alt={name}>
              {/* <AvatarFallback>{name.charAt(0)}</AvatarFallback> */}
            </Avatar>
          </div>
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-medium text-gray-900'>
              {capitalizeAll(name)}
            </p>
            <p className='truncate text-sm text-gray-500'>
              {note?.trim() || '---'}
            </p>
          </div>
        </div>
      ))}
    </>
  );
});
List.displayName = 'List';

const Loader = memo(() => {
  return [...new Array(Math.trunc(Math.random() * (LIMIT - 1)) + 1)].map(
    (_, i) => (
      <div key={i} className='flex items-center space-x-4 p-4'>
        <div className='flex-shrink-0'>
          <Skeleton className='rounded-full' width={'100%'} height={'100%'} />
        </div>
        <div className='min-w-0 flex-1'>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-12' />
          <Skeleton className='h-4 w-48' />
        </div>
      </div>
    ),
  );
});
Loader.displayName = 'Loader';
