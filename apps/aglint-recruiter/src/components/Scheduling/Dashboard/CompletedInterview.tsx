import { CompletedInterviews } from '@devlink3/CompletedInterviews';
import { Stack } from '@mui/material';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import type { getOrderedGraphValues } from '@/job/metrics/utils';
import { useCompletedInterviewDetails } from '@/queries/scheduling-dashboard';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import { BarChart2 } from 'lucide-react';

const CompletedInterviewBarChart = () => {
  const {
    data: completedInterviewsData,
    type,
    setFilterDuration,
  } = useCompletedInterviewDetails();
  return (
    <CompletedInterviews
      slotGraph={
        <Stack height={'330px'}>
          {Object.keys(completedInterviewsData || {}).length ? (
            <BarChart
              skills={Object.entries(completedInterviewsData || {}).map(
                ([key, value]) => ({
                  name: key,
                  count: value,
                  color: '#009A5753',
                }),
              )}
            />
          ) : (
            <div className='h-[296px]'>
              <div className='flex flex-col items-center justify-center h-full'>
                <BarChart2 className='w-12 h-12 text-gray-400' />
                <p className='mt-2 text-sm text-gray-500'>No data available</p>
              </div>
            </div>
          )}
        </Stack>
      }
      onClickLastDays={{
        onClick: () => {
          setFilterDuration(1);
        },
      }}
      onClickLastMonth={{ onClick: () => setFilterDuration(8) }}
      isLastDaysActive={type == 'week'}
      isLastMonthsActive={type == 'month'}
    />
  );
};

export default CompletedInterviewBarChart;

export const BarChart: React.FC<{
  skills: ReturnType<typeof getOrderedGraphValues>;
}> = ({ skills }) => {
  const { names, counts, colors } = skills.reduce(
    (acc, { color, name, count }) => {
      acc.names.push(capitalizeFirstLetter(name));
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
        aspectRatio: 3,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              font: { weight: 'bold' },
              text: 'Interviews',
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
              text: 'Completed',
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
