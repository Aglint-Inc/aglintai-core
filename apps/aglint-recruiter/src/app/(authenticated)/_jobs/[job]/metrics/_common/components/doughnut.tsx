/* eslint-disable security/detect-object-injection */

import useMediaQuery from '@mui/material/useMediaQuery';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import { capitalize } from 'lodash';
import React, { type FC } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { Loader } from '@/components/Common/Loader';
import { useJobDashboard } from '@/job/hooks';
import { getOrderedGraphValues } from '@/job/metrics/utils';

import { type DashboardGraphOptions } from '.';
import { NoDataAvailable } from './nodata';

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

export const DoughnutChart: React.FC<{
  locations: ReturnType<typeof getOrderedGraphValues>;
  fixedHeight?: boolean;
}> = ({ locations, fixedHeight = false }) => {
  const { names, counts, colors } = locations.reduce(
    (acc, { color, name, count }) => {
      acc.names.push(capitalize(name));
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
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        spacing: 4,
        borderRadius: 4,
      },
    ],
  };
  const xl = useMediaQuery('(min-width:1900px)');
  const l = useMediaQuery('(min-width:1500px)');
  const m = useMediaQuery('(min-width:1300px)');
  const s = useMediaQuery('(min-width:1300px)');

  return (
    <div
      className={`aspect-square ${
        fixedHeight
          ? 'h-full'
          : s
            ? m
              ? l
                ? xl
                  ? 'w-[275px]'
                  : 'w-[250px]'
                : 'w-[225px]'
              : 'w-[200px]'
            : 'w-[175px]'
      }`}
    >
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
    </div>
  );
};

const DashboardDoughnutChart: FC<{
  option: keyof DashboardGraphOptions<'locations'>;
}> = ({ option }) => {
  const {
    locations: { data: locationPool, status },
    job: { processing_count },
  } = useJobDashboard();
  if (status === 'pending') return <Loader />;
  if (status === 'error') return <>Error</>;
  const locations = locationPool?.[option] ?? null;
  if (!locations) return <NoDataAvailable />;
  const totalCount = Object.values(processing_count).reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
  const safeLocations = getOrderedGraphValues(locations);
  return (
    <div className='flex w-full flex-col'>
      <div className='flex flex-row items-center justify-around'>
        <DoughnutChart locations={safeLocations} />
        <div className='flex flex-col gap-3'>
          {safeLocations.map(({ color, count, name }, i) => (
            <div key={i} className='flex flex-row justify-between gap-5'>
              <div className='flex flex-row items-center gap-1'>
                <div
                  className='aspect-square w-2.5 rounded-full'
                  style={{ backgroundColor: color }}
                />
                <span className='whitespace-nowrap text-sm capitalize'>
                  {capitalize(name)}
                </span>
              </div>
              <span className='text-sm'>
                {((count / totalCount) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardDoughnutChart;
