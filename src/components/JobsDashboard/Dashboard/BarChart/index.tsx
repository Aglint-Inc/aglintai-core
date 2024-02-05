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

import { stringToColor } from '../utils';
ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);
function BarChart({ data }) {
  const dataBar = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Count',
        data: Object.values(data),
        backgroundColor: Object.keys(data).map((ele) => stringToColor(ele)),
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
}

export default DashboardBarChart;

function DashboardBarChart({ data }) {
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
      <BarChart data={data} />
    </Stack>
  );
}
