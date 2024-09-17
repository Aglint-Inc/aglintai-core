import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardTitle } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
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
      <div className='mb-4 flex w-full flex-row items-center justify-between'>
        <CardTitle>Leaderboard</CardTitle>
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
    <>
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
    </>
  );
});
Dropdown.displayName = 'Dropdown';

const Container = memo(() => {
  const {
    leaderboard: { data, status },
  } = useSchedulingAnalytics();

  if (status === 'error') return <>Error</>;

  if (status === 'pending') return <Loader />;

  if (data.length === 0)
    return (
      <div className='flex flex-col'>
        <Empty />
      </div>
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
            className='cursor-pointer border-none p-4 shadow-none hover:bg-neutral-100'
          >
            <div className='flex items-center space-x-4'>
              <div className='flex-shrink-0'>
                <Avatar>
                  <AvatarImage src={profile_image} alt={name} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <div className='flex-grow'>
                <div className='flex items-center justify-between'>
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
              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200'>
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
    <Skeleton key={i} className='h-full w-full' />
  ));
});
Loader.displayName = 'Loader';
