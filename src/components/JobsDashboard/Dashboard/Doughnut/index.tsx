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

import { useJobApplications } from '@/src/context/JobApplicationsContext';

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
    { names: [], counts: [], colors: [] },
  );
  const dataBar = {
    labels: names,
    datasets: [
      {
        data: counts,
        backgroundColor: colors,
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
};

const DashboardDoughnutChart = () => {
  const {
    locationPool,
    job: { count },
  } = useJobApplications();
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
        borderRadius: '16px',
      }}
      display={'flex'}
      flexDirection={'column'}
      spacing={'16px'}
    >
      <Typography variant='subtitle2'>Candidates by Locations</Typography>
      <Stack direction={'row'} spacing={'80px'} alignItems={'center'}>
        <Stack width={'50%'}>
          <DoughnutChart locations={safeLocations} />
        </Stack>
        <Stack spacing={'20px'} width={'50%'}>
          {safeLocations.map(({ color, count, name }, i) => {
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
                      bgcolor: color,
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                    }}
                  ></Stack>
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
