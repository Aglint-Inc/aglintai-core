import { Stack, useMediaQuery } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

import { useInterviewConversion } from '@/src/queries/scheduling-dashboard';

import AUIButton from '../../Common/AUIButton';
import { interviewConversionTimeFormat } from './utils';

const InterviewConversion = () => {
  const [type, setType] =
    useState<InterviewConversionGraphProps['type']>('month');
  return (
    <Stack direction={'column'} height={'600px'}>
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
      <InterviewConversionGraph type={type} />
    </Stack>
  );
};

type InterviewConversionGraphProps = {
  type: Parameters<typeof useInterviewConversion>[0];
};

const InterviewConversionGraph = ({ type }: InterviewConversionGraphProps) => {
  const { data, status } = useInterviewConversion(type);

  if (status === 'error') return <>Error</>;

  if (status === 'pending') return <>Loading...</>;

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return <>Empty</>;

  const interviewConversion = interviewConversionTimeFormat(type, data);
  return (
    <InterviewConversionComponent
      key={`InterviewConversionComponent${type}`}
      interviewConversion={interviewConversion}
    />
  );
};

export default InterviewConversion;

type InterviewConversionProps = {
  interviewConversion: ReturnType<typeof useInterviewConversion>['data'];
};

const InterviewConversionComponent = ({
  interviewConversion,
}: InterviewConversionProps) => {
  return <LineChart interviewConversion={interviewConversion} />;
};

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

const LineChart = ({ interviewConversion }: InterviewConversionProps) => {
  const matches = useMediaQuery('(min-width:1920px)');
  const { names, counts, pointBackgroundColor } = interviewConversion.reduce(
    (acc, { timeline, count }) => {
      acc.names.push(timeline);
      acc.counts.push(count);
      acc.pointBackgroundColor.push('#87929d');
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
        borderColor: '#87929d',
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
              title: (values) =>
                `${values[0].label} year${+values[0].label === 1 ? '' : 's'}`,
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
              text: 'Days',
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
              color: 'rgba(0,0,0,0.05)',
            },
          },
        },
      }}
      data={dataLines}
    />
  );
};
