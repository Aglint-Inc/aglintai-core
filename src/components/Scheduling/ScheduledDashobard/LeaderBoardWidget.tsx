import { Avatar } from '@mui/material';
import React from 'react';

import { LeaderBoard, LeaderBoardCard } from '@/devlink3';
import { capitalizeAll } from '@/src/utils/text/textUtils';

type LeaderBoardWidgetType = {
  interviewers: {
    id: string;
    name: string;
    photo: string;
    title: string;
    hours: number;
    interviews: number;
  }[];
  filter: 'week' | 'month' | 'year';
  // eslint-disable-next-line no-unused-vars
  setFilter: (x: 'week' | 'month' | 'year') => void;
};

const LeaderBoardWidget = ({
  interviewers,
  filter,
  setFilter,
}: LeaderBoardWidgetType) => {
  //   const [filter, setFilter] = useState<'week' | 'month' | 'year'>('week');
  return (
    <LeaderBoard
      isWeekActive={filter === 'week'}
      isMonthActive={filter === 'month'}
      isYearActive={filter === 'year'}
      onClickThisWeek={{
        onClick: () => {
          setFilter('week');
        },
      }}
      onClickThisMonth={{
        onClick: () => {
          setFilter('month');
        },
      }}
      onClickThisYear={{
        onClick: () => {
          setFilter('year');
        },
      }}
      slotLeaderboardCard={
        <>
          {interviewers.map((item, index) => (
            <LeaderBoardCard
              key={item.id}
              textCountNo={index + 1}
              // textHour={}
              // textInterview={}
              textName={capitalizeAll(item.name)}
              textRole={item.title}
              slotImage={
                <Avatar
                  src={item.photo}
                  alt={item.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              }
              noInterview={item.interviews}
              noHours={item.hours}
            />
          ))}
        </>
      }
    />
  );
};

export default LeaderBoardWidget;
