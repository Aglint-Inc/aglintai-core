import { AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { memo } from 'react';

import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/context/SchedulingAnalytics';
import { capitalizeAll } from '@/utils/text/textUtils';

import { Empty } from './common';
import { FilterDropDownDash } from './FilterDropDownDash';

const LIMIT = 5;

export const Leaderboard = memo(() => {
  return (
    <Card className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-semibold'>Leaderboard</h3>
        <Dropdown />
      </div>
      <Container />
    </Card>
  );
});

Leaderboard.displayName = 'Leaderboard';

const Dropdown = memo(() => {
  const { leaderboardType, setLeaderboardType } = useSchedulingAnalytics();
  return (
    <FilterDropDownDash
      itemList={[
        { label: 'Past Week', value: 'week' },
        { label: 'Past Month', value: 'month' },
        { label: 'Past Year', value: 'year' },
        { label: 'All Time', value: 'all_time' },
      ]}
      onChange={setLeaderboardType}
      value={leaderboardType}
    />
  );
});
Dropdown.displayName = 'Dropdown';

const Container = memo(() => {
  const {
    leaderboard: { data, status },
  } = useSchedulingAnalytics();

  if (status === 'error') return <>Error</>;

<<<<<<< HEAD
  if (status === 'pending') return <Loader />;
=======
  if (status === 'pending')
    return (
      <div className='flex h-[350px] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
      </div>
    );
>>>>>>> 8eb6ea7dfa37de2bebc9079affacd757345fc96f

  if (data.length === 0)
    return (
      <Stack>
        <Empty />
      </Stack>
    );

  return <List data={data.slice(0, LIMIT + 1)} />;
});
Container.displayName = 'Container';

type Props = Pick<SchedulingAnalyticsContextType['leaderboard'], 'data'>;

const List = memo(({ data }: Props) => {
  return (
    <>
      {(data ?? []).map(
        (
          { duration, interviews, name, position, profile_image, user_id },
          index,
        ) => (
          <Card
            key={user_id}
            className='cursor-pointer hover:bg-neutral-100 p-4'
          >
            <div className='flex items-center space-x-4'>
              <div className='flex-shrink-0'>
                <Avatar>
                  <AvatarImage src={profile_image} alt={name} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className='flex-grow'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-sm font-medium'>{capitalizeAll(name)}</p>
                    <p className='text-xs text-gray-500'>
                      {capitalizeAll(position)}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-medium'>
                      {interviews} interviews
                    </p>
                    <p className='text-xs text-gray-500'>
                      {(duration / 60).toFixed(1)} hours
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>
                <span className='text-sm font-medium'>{index + 1}</span>
              </div>
            </div>
          </Card>
        ),
      )}
    </>
  );
});
List.displayName = 'ListList';

const Loader = memo(() => {
  return [...new Array(Math.trunc(Math.random() * LIMIT) + 1)].map((_, i) => (
<<<<<<< HEAD
    <Skeleton key={i} className='w-full h-full' />
=======
    <LeaderBoardLoader
      key={i}
      slotSkeleton={<Skeleton className='h-full w-full' />}
    />
>>>>>>> 8eb6ea7dfa37de2bebc9079affacd757345fc96f
  ));
});
Loader.displayName = 'Loader';
