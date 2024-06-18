/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { NewInterviewDetail } from '@/devlink3/NewInterviewDetail';
import { NoData } from '@/devlink3/NoData';
import { useInterviewMeetingStatus } from '@/src/queries/scheduling-dashboard';

import Loader from '../../Common/Loader';
import { interviewMeetingTimeFormat } from './utils';

type MeetingStatusObjType = ReturnType<
  typeof useInterviewMeetingStatus
>['data'][number];

type InterviewMeetingStatusCountProps = {
  interviewMeetingStatus: {
    [id in keyof MeetingStatusObjType]: MeetingStatusObjType[id][];
  };
};
export const InterviewMeetingStatus = () => {
  return (
    <NewInterviewDetail
      textHeading={'Declined Interviews'}
      slotDropdownButton={<></>}
      slotInterviewDetailPill={
        <InterviewMeetingStatusComponent type={'month'} />
      }
    />
  );
};

export default InterviewMeetingStatus;

type InterviewMeetingStatusProps = {
  type: Parameters<typeof useInterviewMeetingStatus>[0];
};

const InterviewMeetingStatusComponent = ({
  type,
}: InterviewMeetingStatusProps) => {
  const { data, status } = useInterviewMeetingStatus(type);

  if (status === 'pending') return <Loader />;

  if (!data?.filter((item) => item.cancelled).length) return <NoData />;

  const safeData = interviewMeetingTimeFormat(type, data).reduce(
    (acc, curr) => {
      Object.entries(curr).forEach(([key, value]) => {
        if (!acc?.[key] ?? null) acc[key] = [];
        acc[key].push(value);
      });
      return acc;
    },
    {} as InterviewMeetingStatusCountProps['interviewMeetingStatus'],
  );
  return (
    <Stack height={'100%'}>
      <StackedBar interviewMeetingStatus={safeData} />
    </Stack>
  );
};

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

const StackedBar = ({
  interviewMeetingStatus: { timeline, cancelled },
}: InterviewMeetingStatusCountProps) => {
  return (
    <Bar
      options={{
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 4,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              font: { weight: 'bold' },
              text: 'Interviews',
            },
            border: {
              color: 'transparent',
            },
            grid: {
              display: false,
            },
          },
          y: {
            stacked: true,
            title: {
              display: true,
              font: { weight: 'bold' },
              text: 'Time',
            },
            border: {
              color: 'transparent',
            },
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05',
            },
          },
        },
      }}
      data={{
        labels: timeline,
        datasets: [
          {
            label: 'Cancelled interviews',
            data: cancelled,
            backgroundColor: '#D8DCDE',
            barThickness: 20,
          },
        ],
      }}
    />
  );
};
