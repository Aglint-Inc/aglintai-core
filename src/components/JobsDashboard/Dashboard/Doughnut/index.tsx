import { Stack, Typography } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import { capitalize } from 'lodash';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { stringToColor } from '../utils';
ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);
function DoughnutChart({ data }) {
  const dataBar = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: Object.keys(data).map(
          (ele) => ele && stringToColor(String(ele)),
        ),
      },
    ],
  };

  return (
    <Doughnut
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false, // Set to false to hide the legend
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      }}
      data={dataBar}
    />
  );
}

export default DashboardDoughnutChart;
let totalCount = 0;
function DashboardDoughnutChart({ data }) {
  Object.values(data).map((ele) => {
    totalCount = totalCount + Number(ele);
  });
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
      <Typography variant='subtitle2'>Candidates by Locations</Typography>
      <Stack direction={'row'} spacing={'80px'} alignItems={'center'}>
        <Stack width={'50%'}>
          <DoughnutChart data={data} />
        </Stack>
        <Stack spacing={'20px'} width={'50%'}>
          {Object.entries(data).map((locationCount, i) => {
            return (
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                spacing={'40px'}
                key={i}
              >
                <Stack direction={'row'} spacing={'10px'} alignItems={'center'}>
                  <Stack
                    sx={{
                      bgcolor: stringToColor(locationCount[0]),
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                    }}
                  ></Stack>
                  <Typography variant='body2'>
                    {capitalize(locationCount[0])}
                  </Typography>
                </Stack>
                <Typography variant='body2'>
                  {((Number(locationCount[1]) / totalCount) * 100).toFixed(0)}%
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}
