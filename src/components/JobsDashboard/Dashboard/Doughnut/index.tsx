import { Stack, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip
} from 'chart.js/auto';
import { capitalize } from 'lodash';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import { useJobDashboard } from '@/src/context/JobDashboard';

import { getOrderedGraphValues } from '../utils';

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

const DoughnutChart: React.FC<{
  locations: ReturnType<typeof getOrderedGraphValues>;
}> = ({ locations }) => {
  const { names, counts, colors } = locations.reduce(
    (acc, { color, name, count }) => {
      acc.names.push(name);
      acc.counts.push(count);
      acc.colors.push(color);
      return acc;
    },
    { names: [], counts: [], colors: [] }
  );
  const dataBar = {
    labels: names,
    datasets: [
      {
        data: counts,
        backgroundColor: colors,
        borderColor: colors
      }
    ]
  };
  const matches = useMediaQuery('(min-width:1920px)');

  return (
    <Stack width={matches ? '350px' : '250px'} style={{ aspectRatio: 1 }}>
      <Doughnut
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false // Set to false to hide the legend
            }
          },
          scales: {
            x: {
              display: false
            },
            y: {
              display: false
            }
          }
        }}
        data={dataBar}
      />
    </Stack>
  );
};

const DashboardDoughnutChart = () => {
  const {
    analytics: { locations: locationPool },
    job: { count }
  } = useJobDashboard();
  const locations = locationPool?.city ?? null;
  if (!locations) return <></>;
  const totalCount = Object.values(count).reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
  const safeLocations = getOrderedGraphValues(locations);
  return (
    <Stack
      sx={{
        bgcolor: '#F7F9FB',
        p: '24px',
        borderRadius: '16px'
      }}
      display={'flex'}
      flexDirection={'column'}
      spacing={'16px'}
      width={'100%'}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-around'}
      >
        <DoughnutChart locations={safeLocations} />
        <Stack gap={3} width={'30%'}>
          {safeLocations.map(({ color, count, name }, i) => {
            return (
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                gap={5}
                key={i}
              >
                <Stack direction={'row'} gap={1} alignItems={'center'}>
                  <Stack
                    sx={{
                      bgcolor: color,
                      width: '10px',
                      aspectRatio: 1,
                      borderRadius: '100%'
                    }}
                  />
                  <Typography variant='body2'>{capitalize(name)}</Typography>
                </Stack>
                <Typography variant='body2'>
                  {((count / totalCount) * 100).toFixed(0)}%
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DashboardDoughnutChart;
