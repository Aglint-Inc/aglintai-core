import { Avatar, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { InterviewRatio } from '@/devlink3/InterviewRatio';
import { NewScheduleCard } from '@/devlink3/NewScheduleCard';
import { YourSchedules } from '@/devlink3/YourSchedules';
import { capitalizeAll } from '@/src/utils/text/textUtils';

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
          <Stack gap={1}>
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
                      sx={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  }
                  slotIconMeeting={
                    <Avatar
                      src={item.meetingClient.icon}
                      alt={item.meetingClient.name}
                      sx={{
                        width: '24px',
                        height: '24px',
                      }}
                    />
                  }
                  textCandidateName={capitalizeAll(item.candidate.name)}
                  textPlatformName={capitalizeAll(item.meetingClient.name)}
                  textTitle={item.meetingName}
                />
              );
            })}
          </Stack>
        }
      />
      <InterviewRatio />
    </>
  );
};

export default YourScheduleMeetings;
