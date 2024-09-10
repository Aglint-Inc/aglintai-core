import { Skeleton } from '@components/ui/skeleton';
import { LeaderBoard } from '@devlink3/LeaderBoard';
import { LeaderBoardCard } from '@devlink3/LeaderBoardCard';
import { LeaderBoardLoader } from '@devlink3/LeaderBoardLoader';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Loader2 } from 'lucide-react';
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
    <LeaderBoard
      slotDropdownButton={<Dropdown />}
      slotLeaderboardCard={<Container />}
    />
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

  if (status === 'pending')
    return (
      <div className='flex items-center justify-center h-[350px]'>
        <Loader2 className='w-8 h-8 animate-spin text-gray-400' />
      </div>
    );

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
          <Stack
            key={user_id}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'var(--neutral-3)',
              },
            }}
          >
            <LeaderBoardCard
              textCountNo={index + 1}
              textName={capitalizeAll(name)}
              textRole={capitalizeAll(position)}
              slotImage={
                <Avatar
                  src={profile_image}
                  alt={name}
                  variant='rounded-medium'
                />
              }
              noInterview={interviews}
              noHours={(duration / 60).toFixed(1)}
            />
          </Stack>
        ),
      )}
    </>
  );
});
List.displayName = 'ListList';

const Loader = memo(() => {
  return [...new Array(Math.trunc(Math.random() * LIMIT) + 1)].map((_, i) => (
    <LeaderBoardLoader
      key={i}
      slotSkeleton={<Skeleton className='w-full h-full' />}
    />
  ));
});
Loader.displayName = 'Loader';
