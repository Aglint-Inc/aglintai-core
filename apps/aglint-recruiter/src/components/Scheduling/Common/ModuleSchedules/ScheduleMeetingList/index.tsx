import { Grid, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { NewMyScheduleCard } from '@/devlink3/NewMyScheduleCard';

import { ScheduleListType } from '../hooks';
import ScheduleMeetingCard from '../ScheduleMeetingCard';

function ScheduleMeetingList({
  FilterSchedules,
}: {
  FilterSchedules: ScheduleListType;
}) {
  return (
    <Stack height={'calc(100vh - 154px)'}>
      {transformData(FilterSchedules).map((sch, ind) => {
        const date = Object.keys(sch)[0];
        const schedules = sch[String(date)] as ScheduleListType;
        return (
          <Grid item sm={12} md={12} lg={6} xl={4} key={ind}>
            <NewMyScheduleCard
              textDate={dayjs(date).format('DD')}
              textDay={dayjs(date).format('ddd')}
              textMonth={dayjs(date).format('MMM')}
              slotMyScheduleSubCard={schedules.map((meetingDetails, i) => {
                return (
                  <ScheduleMeetingCard
                    key={i}
                    meetingDetails={meetingDetails}
                  />
                );
              })}
            />
          </Grid>
        );
      })}
    </Stack>
  );
}

export default ScheduleMeetingList;

function transformData(inputData: ScheduleListType) {
  const transformedData = {};

  inputData?.forEach((item) => {
    const date = item.interview_meeting.start_time?.split('T')[0]; // Extracting date from start_time
    if (!transformedData[String(date)]) {
      transformedData[String(date)] = [];
    }
    transformedData[String(date)].push(item);
  });

  const result = [];
  for (const date in transformedData) {
    result.push({ [date]: transformedData[String(date)] });
  }

  return result.sort((a, b) => {
    const dateA = Object.keys(a)[0];
    const dateB = Object.keys(b)[0];
    return (new Date(dateA) as any) - (new Date(dateB) as any);
  });
}
