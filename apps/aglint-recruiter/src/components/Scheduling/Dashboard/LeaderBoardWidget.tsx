import { Avatar, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Skeleton } from '@/devlink2/Skeleton';
import { LeaderBoard } from '@/devlink3/LeaderBoard';
import { LeaderBoardCard } from '@/devlink3/LeaderBoardCard';
import { LeaderBoardLoader } from '@/devlink3/LeaderBoardLoader';
import { NoData } from '@/devlink3/NoData';
import { useInterviewLeaderboard } from '@/src/queries/scheduling-dashboard';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import SchedulingDropdown from './SchedulingDropdown';

const LeaderBoardWidget = () => {
  const [type, setType] = useState<LeaderBoardWidgetRowsProps['type']>('month');
  return (
    <LeaderBoard
      slotDropdownButton={<SchedulingDropdown type={type} setType={setType} />}
      slotLeaderboardCard={<LeaderBoardWidgetRows type={type} />}
    />
  );
};

type LeaderBoardWidgetRowsProps = {
  type: Parameters<typeof useInterviewLeaderboard>[0];
};

const LeaderBoardWidgetRows = ({ type }: LeaderBoardWidgetRowsProps) => {
  const { data, status } = useInterviewLeaderboard(type);

  if (status === 'pending')
    return [...new Array(Math.trunc(Math.random() * 9) + 1)].map((_, i) => (
      <LeaderBoardLoader key={i} slotSkeleton={<Skeleton />} />
    ));

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return <NoData />;

  return <LeaderBoardWidgetComponent interviewLeaderboard={data} />;
};

export default LeaderBoardWidget;

type InterviewLeaderboardProps = {
  interviewLeaderboard: ReturnType<typeof useInterviewLeaderboard>['data'];
};
const LeaderBoardWidgetComponent = ({
  interviewLeaderboard,
}: InterviewLeaderboardProps) => {
  const router = useRouter();
  return (
    <>
      {interviewLeaderboard.map((item, index) => (
        <Stack
          key={item.user_id}
          onClick={() => {
            router.push(`scheduling/interviewer/${item.user_id}?tab=overview`);
          }}
          sx={{
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            ': hover': {
              backgroundColor: 'var(--neutral-3)',
            },
          }}
        >
          <LeaderBoardCard
            textCountNo={index + 1}
            textName={capitalizeAll(
              getFullName(item.first_name, item.last_name),
            )}
            textRole={item.user_position}
            slotImage={
              <Avatar
                src={item.profile_image}
                alt={getFullName(item.first_name, item.last_name)}
                variant='rounded-medium'
              />
            }
            noInterview={item.interviews}
            noHours={(item.duration / 60).toFixed(1)}
          />
        </Stack>
      ))}
    </>
  );
};
