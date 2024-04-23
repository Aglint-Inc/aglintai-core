import { Avatar, Stack } from '@mui/material';
import React, { useState } from 'react';

import { LeaderBoard, LeaderBoardCard } from '@/devlink3';
import { useInterviewLeaderboard } from '@/src/queries/scheduling-dashboard';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import AUIButton from '../../Common/AUIButton';

const LeaderBoardWidget = () => {
  const [type, setType] = useState<LeaderBoardWidgetRowsProps['type']>('month');
  return (
    <Stack direction={'column'}>
      <Stack direction={'row'} ml={'auto'} gap={2}>
        <AUIButton onClick={() => setType('day')} disabled={type === 'day'}>
          Past week
        </AUIButton>
        <AUIButton onClick={() => setType('week')} disabled={type === 'week'}>
          Past month
        </AUIButton>
        <AUIButton onClick={() => setType('month')} disabled={type === 'month'}>
          Past year
        </AUIButton>
        <AUIButton onClick={() => setType('year')} disabled={type === 'year'}>
          All time
        </AUIButton>
      </Stack>
      <LeaderBoardWidgetRows type={type} />;
    </Stack>
  );
};

type LeaderBoardWidgetRowsProps = {
  type: Parameters<typeof useInterviewLeaderboard>[0];
};

const LeaderBoardWidgetRows = ({ type }: LeaderBoardWidgetRowsProps) => {
  const { data, status } = useInterviewLeaderboard(type);

  if (status === 'error') return <>Error</>;

  if (status === 'pending') return <>Loading...</>;

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return <>Empty</>;

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
    <LeaderBoard
      isWeekActive={true}
      isMonthActive={false}
      isYearActive={false}
      // onClickThisWeek={{
      //   onClick: () => {
      //     setFilter('week');
      //   },
      // }}
      // onClickThisMonth={{
      //   onClick: () => {
      //     setFilter('month');
      //   },
      // }}
      // onClickThisYear={{
      //   onClick: () => {
      //     setFilter('year');
      //   },
      // }}
      slotLeaderboardCard={
        <>
          {interviewLeaderboard.map((item, index) => (
            <LeaderBoardCard
              key={item.user_id}
              textCountNo={index + 1}
              // textHour={}
              // textInterview={}
              textName={capitalizeAll(
                getFullName(item.first_name, item.last_name),
              )}
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
              noHours={item.duration}
            />
          ))}
        </>
      }
    />
  );
};
