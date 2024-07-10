/* eslint-disable security/detect-object-injection */
import { useMediaQuery } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';

import { NoData } from '@/devlink3/NoData';
import Loader from '@/src/components/Common/Loader';
import { useJobDashboard } from '@/src/context/JobDashboard';
import { capitalize } from '@/src/utils/text/textUtils';

import { DashboardGraphOptions } from '.';
import { getOrderedGraphValues } from './utils';

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

const BarChart: React.FC<{
  skills: ReturnType<typeof getOrderedGraphValues>;
}> = ({ skills }) => {
  const matches = useMediaQuery('(min-width:1920px)');
  const { labels, tooltips, counts, colors } = skills.reduce(
    (acc, { color, name, count }) => {
      const safeName = capitalize((name ?? '').trim());
      acc.labels.push(
        safeName.length > 12 ? `${safeName.slice(0, 12)}..` : safeName,
      );
      acc.tooltips.push(safeName);
      acc.counts.push(count);
      acc.colors.push(color);
      return acc;
    },
    { labels: [], tooltips: [], counts: [], colors: [] },
  );
  const dataBar = {
    labels: labels,
    datasets: [
      {
        label: 'Candidates',
        data: counts,
        backgroundColor: colors,
        borderRadius: 8,
        borderSkipped: false,
        grouped: true,
        barThickness: 40,
      },
    ],
  };

  return (
    <Bar
      options={{
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: matches ? 4 : 3,
        plugins: {
          tooltip: {
            callbacks: {
              title: (values) => tooltips[values[0].dataIndex],
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
              text: 'Skills',
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
              color: 'rgba(0, 0, 0, 0.05)',
            },
          },
        },
      }}
      data={dataBar}
    />
  );
};

const DashboardBarChart: FC<{
  option: keyof DashboardGraphOptions<'skills'>;
}> = ({ option }) => {
  const {
    skills: { data: skillPool, status },
  } = useJobDashboard();
  if (status === 'pending') return <Loader />;
  if (status === 'error') return <>Error</>;
  const skills = skillPool?.[option] ?? null;
  const total = skills
    ? Object.values(skills).reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0)
    : 0;
  const safeSkills = getOrderedGraphValues(skills);
  if (total === 0) return <NoData />;
  return <BarChart skills={safeSkills} />;
};

export default DashboardBarChart;
