import { Stack, useMediaQuery } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import { capitalize } from 'lodash';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

import { InterviewRatio } from '@/devlink3/InterviewRatio';
import { NoData } from '@/devlink3/NoData';
import { useInterviewConversion } from '@/src/queries/scheduling-dashboard';

import Loader from '../../Common/Loader';
import SchedulingDropdown from './SchedulingDropdown';
import { interviewConversionTimeFormat } from './utils';

const InterviewConversion = () => {
  const [type, setType] =
    useState<InterviewConversionGraphProps['type']>('month');
  return (
    <InterviewRatio
      slotDropdownButton={<SchedulingDropdown type={type} setType={setType} />}
      slotInterviewGraph={
        <Stack
          width={'100%'}
          height={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <InterviewConversionGraph type={type} />
        </Stack>
      }
    />
  );
};

type InterviewConversionGraphProps = {
  type: Parameters<typeof useInterviewConversion>[0];
};

const InterviewConversionGraph = ({ type }: InterviewConversionGraphProps) => {
  const { data, status } = useInterviewConversion(type);

  if (status === 'pending') return <Loader />;

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return <NoData />;

  const interviewConversion = interviewConversionTimeFormat(type, data);
  return (
    <InterviewConversionComponent
      key={`InterviewConversionComponent${type}`}
      interviewConversion={interviewConversion}
      type={type}
    />
  );
};

export default InterviewConversion;

type InterviewConversionProps = {
  interviewConversion: ReturnType<typeof useInterviewConversion>['data'];
  type: InterviewConversionGraphProps['type'];
};

const InterviewConversionComponent = ({
  interviewConversion,
  type,
}: InterviewConversionProps) => {
  return <LineChart interviewConversion={interviewConversion} type={type} />;
};

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

const LineChart = ({ interviewConversion, type }: InterviewConversionProps) => {
  const matches = useMediaQuery('(min-width:1920px)');
  const { names, counts, pointBackgroundColor } = interviewConversion.reduce(
    (acc, { timeline, count }) => {
      acc.names.push(timeline);
      acc.counts.push(count);
      acc.pointBackgroundColor.push('#8d8d8690');
      return acc;
    },
    { names: [], counts: [], pointBackgroundColor: [] },
  );
  const dataLines = {
    labels: names,
    datasets: [
      {
        label: 'Offers',
        fill: true,
        backgroundColor: (context) => {
          const bgColor = ['#68737d25', 'transparent'];
          if (!context.chart.chartArea) return;
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(0, bgColor[0]);
          gradientBg.addColorStop(1, bgColor[1]);
          return gradientBg;
        },
        data: counts,
        borderColor: '#bcbbb5',
        pointBackgroundColor,
        tension: 0.3,
      },
    ],
  };

  return (
    <Line
      id='scheduling_dashboard_line_graph'
      options={{
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: matches ? 4 : 3,
        plugins: {
          tooltip: {
            callbacks: {
              title: (values) => `${values[0].label}`, //year${+values[0].label === 1 ? '' : 's'}
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              font: { weight: 'bold' },
              text: `${capitalize(type)}s`,
            },
            border: {
              color: 'transparent',
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              font: { weight: 'bold' },
              text: 'Offers',
            },
            border: {
              color: 'transparent',
            },
            grid: {
              display: true,
              color: 'rgba(0, 0, 0, 0.05)',
            },
          },
        },
      }}
      data={dataLines}
    />
  );
};
