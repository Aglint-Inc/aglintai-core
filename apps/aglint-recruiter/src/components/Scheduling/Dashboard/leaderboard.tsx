import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { memo } from 'react';

import { Skeleton } from '@/devlink2/Skeleton';
import { LeaderBoard } from '@/devlink3/LeaderBoard';
import { LeaderBoardCard } from '@/devlink3/LeaderBoardCard';
import { LeaderBoardLoader } from '@/devlink3/LeaderBoardLoader';
import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/src/context/SchedulingAnalytics';
import { capitalizeAll } from '@/src/utils/text/textUtils';

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

  if (status === 'pending') return <Loader />;

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
    <LeaderBoardLoader key={i} slotSkeleton={<Skeleton />} />
  ));
});
Loader.displayName = 'Loader';
