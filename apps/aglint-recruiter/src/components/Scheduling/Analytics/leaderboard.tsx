import { Avatar } from '@mui/material';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { memo } from 'react';

import { LeaderBoard } from '@/devlink3/LeaderBoard';
import { LeaderBoardCard } from '@/devlink3/LeaderBoardCard';
import {
  type SchedulingAnalyticsContextType,
  useSchedulingAnalytics,
} from '@/src/context/SchedulingAnalytics';

import Loader from '../../Common/Loader';

export const Leaderboard = memo(() => {
  const {
    leaderboard: { data, status },
  } = useSchedulingAnalytics();
  if (status === 'error') return <>Error</>;
  if (status === 'pending')
    return (
      <Stack style={{ height: '500px', width: '100%' }}>
        <Loader />
      </Stack>
    );
  return (
    <Stack style={{ height: '500px', width: '100%' }}>
      <LeaderBoard
        slotDropdownButton={<></>}
        slotLeaderboardCard={<List data={data} />}
      />
    </Stack>
  );
});
Leaderboard.displayName = 'Leaderboard';

type Props = Pick<SchedulingAnalyticsContextType['leaderboard'], 'data'>;

const List = ({ data }: Props) => {
  return (
    <>
      {(data ?? []).map(
        ({ duration, interviews, name, position, profile_image, user_id }) => (
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
              textCountNo={interviews}
              textName={<Link href={`/user/profile/${user_id}`}>{}</Link>}
              textRole={position}
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
};
