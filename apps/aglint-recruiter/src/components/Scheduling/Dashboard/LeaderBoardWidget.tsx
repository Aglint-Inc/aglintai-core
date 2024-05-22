import { Avatar } from '@mui/material';
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
      slotDropdownButton={
        <SchedulingDropdown
          type={type}
          onChange={(e) => setType(e.target.value as typeof type)}
        />
      }
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
  return (
    <>
      {interviewLeaderboard.map((item, index) => (
        <LeaderBoardCard
          key={item.user_id}
          textCountNo={index + 1}
          textName={capitalizeAll(getFullName(item.first_name, item.last_name))}
          textRole={item.user_position}
          slotImage={
            <Avatar
              src={item.profile_image}
              alt={getFullName(item.first_name, item.last_name)}
              sx={{
                width: '100%',
                height: '100%',
              }}
            />
          }
          noInterview={item.interviews}
          noHours={(item.duration / 60).toFixed(1)}
        />
      ))}
    </>
  );
};
