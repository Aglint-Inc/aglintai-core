/* eslint-disable security/detect-object-injection */

import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import React, { type FC, Suspense } from 'react';
import { Line } from 'react-chartjs-2';
import { ErrorBoundary } from 'react-error-boundary';

import { Loader } from '@/components/Common/Loader';
import { useMetricsExperienceAndTenure } from '@/job/hooks';

import type { MetricsOptions } from '../types';
import { NoDataAvailable } from './nodata';

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

const LineChart: React.FC<{
  experience: { [id: number]: number };
}> = ({ experience }) => {
  const matches = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(min-width: 1920px)').matches;
    }
    return false;
  }, []);
  const { names, counts, pointBackgroundColor } = Object.entries(
    experience,
  ).reduce(
    (acc, [key, value]) => {
      acc.names.push(key);
      acc.counts.push(value);
      acc.pointBackgroundColor.push('#8d8d8690');
      return acc;
    },
    { names: [], counts: [], pointBackgroundColor: [] },
  );

  const dataLines = {
    labels: names,
    datasets: [
      {
        label: 'Candidates',
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
      id='job_dashboard_line_graph'
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
              text: 'Years',
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
              text: 'Candidates',
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
      data={dataLines}
    />
  );
};

export const DashboardLineChart: FC<{
  option: keyof Pick<
    MetricsOptions<'experienceAndTenure'>,
    'experience' | 'tenure'
  >;
}> = ({ option }) => {
  return (
    <ErrorBoundary fallback={<>Error</>}>
      <Suspense fallback={<Loader />}>
        <Content option={option} />
      </Suspense>
    </ErrorBoundary>
  );
};

const Content: FC<{
  option: keyof Pick<
    MetricsOptions<'experienceAndTenure'>,
    'experience' | 'tenure'
  >;
}> = ({ option }) => {
  const [dataSet] = useMetricsExperienceAndTenure();
  const experience = dataSet?.[option] ?? null;
  const total = experience
    ? Object.values(experience).reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0)
    : 0;
  if (total === 0) return <NoDataAvailable />;
  return <LineChart experience={experience} />;
};