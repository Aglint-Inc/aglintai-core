import { Stack, Typography } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { useJobApplications } from '@/src/context/JobApplicationsContext';

import { getOrderedGraphValues } from '../utils';

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

const BarChart: React.FC<{
  skills: ReturnType<typeof getOrderedGraphValues>;
}> = ({ skills }) => {
  const { names, counts, colors } = skills.reduce(
    (acc, { color, name, count }) => {
      acc.names.push(name);
      acc.counts.push(count);
      acc.colors.push(color);
      return acc;
    },
    { names: [], counts: [], colors: [] },
  );
  const dataBar = {
    labels: names,
    datasets: [
      {
        label: 'Count',
        data: counts,
        backgroundColor: colors,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  return (
    <Bar
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false, // Set to false to hide the legend
          },
          // title: {
          //   text: "Interview by company",
          //   display: true, // Set to false to hide the title
          // },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      }}
      data={dataBar}
    />
  );
};

export default DashboardBarChart;

function DashboardBarChart() {
  const { skillPool } = useJobApplications();
  const total = skillPool
    ? Object.values(skillPool).reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0)
    : 0;
  if (total === 0) return <></>;
  const safeSkills = getOrderedGraphValues(skillPool);
  return (
    <Stack
      sx={{
        bgcolor: '#F7F9FB',
        p: '24px',
        borderRadius: '16px',
      }}
      display={'flex'}
      flexDirection={'column'}
      spacing={'16px'}
    >
      <Typography variant='subtitle2'>Candidates with skills</Typography>
      <BarChart skills={safeSkills} />
    </Stack>
  );
}
