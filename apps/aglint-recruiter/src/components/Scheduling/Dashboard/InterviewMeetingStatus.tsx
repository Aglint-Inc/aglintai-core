/* eslint-disable security/detect-object-injection */
import { NewInterviewDetail } from '@devlink3/NewInterviewDetail';
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

import { useInterviewMeetingStatus } from '@/queries/scheduling-dashboard';

import { interviewMeetingTimeFormat } from './utils';
import { BarChart2, Loader2 } from 'lucide-react';

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

  if (status === 'pending')
    return (
      <div className='flex items-center justify-center h-[350px]'>
        <Loader2 className='w-8 h-8 animate-spin text-gray-400' />
      </div>
    );

  if (!data?.filter((item) => item.cancelled).length)
    return (
      <div className='h-[296px]'>
        <div className='flex flex-col items-center justify-center h-full'>
          <BarChart2 className='w-12 h-12 text-gray-400' />
          <p className='mt-2 text-sm text-gray-500'>No data available</p>
        </div>
      </div>
    );

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
