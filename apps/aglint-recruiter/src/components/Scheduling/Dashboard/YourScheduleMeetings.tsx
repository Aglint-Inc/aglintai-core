import { InterviewRatio } from '@devlink3/InterviewRatio';
import { NewScheduleCard } from '@devlink3/NewScheduleCard';
import { YourSchedules } from '@devlink3/YourSchedules';
import { Avatar } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { capitalizeAll } from '@/utils/text/textUtils';

type YourScheduleMeetingsType = {
  meetings: {
    candidate: {
      name: string;
      image: string;
    };
    meetingClient: {
      icon: string;
      name: string;
    };
    meetingName: string;
    time: {
      start: string;
      end: string;
    };
  }[];
  onClickViewSchedules: () => void;
};

const YourScheduleMeetings = ({
  meetings,
  onClickViewSchedules,
}: YourScheduleMeetingsType) => {
  return (
    <>
      <YourSchedules
        onClickViewSchedules={{ onClick: () => onClickViewSchedules() }}
        slotScheduleCard={
          <div className='flex flex-col space-y-4'>
            {meetings.map((item, index) => {
              const date = new Date(item.time.start);
              const meetingDay = dayjs(date).format('ddd');
              const meetingDate = date.getDate();
              const month = dayjs(date).format('MMMM');
              const meetTime = `${dayjs(item.time.start).format('hh:mm A')} to ${dayjs(item.time.end).format('hh:mm A')}`;
              item.meetingClient.icon = item.meetingClient.icon?.length
                ? item.meetingClient.icon
                : null;
              return (
                <NewScheduleCard
                  key={index}
                  textDay={meetingDay}
                  textDate={meetingDate}
                  textMonth={month}
                  textMeetTime={meetTime}
                  slotCandidateImage={
                    <Avatar
                      src={item.candidate.image}
                      alt={item.candidate.name}
                      className='w-full h-full'
                    />
                  }
                  slotIconMeeting={
                    <Avatar
                      src={item.meetingClient.icon}
                      alt={item.meetingClient.name}
                      className='w-6 h-6'
                    />
                  }
                  textCandidateName={capitalizeAll(item.candidate.name)}
                  textPlatformName={capitalizeAll(item.meetingClient.name)}
                  textTitle={item.meetingName}
                />
              );
            })}
          </div>
        }
      />
      <InterviewRatio />
    </>
  );
};

export default YourScheduleMeetings;
