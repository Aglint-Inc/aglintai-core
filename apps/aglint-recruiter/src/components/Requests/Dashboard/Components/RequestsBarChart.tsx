import { useMediaQuery } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import { capitalize } from 'lodash';
import { type FC } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

export const RequestsBarChart: FC<{
  createdRequestData: { name: string; count: number }[];
  completedRequestData: { name: string; count: number }[];
  onGoingRequestData: { name: string; count: number }[];
}> = ({ createdRequestData, completedRequestData, onGoingRequestData }) => {
  const matches = useMediaQuery('(min-width:1920px)');
  const { createdLabels, createdTooltips, createdCounts } =
    createdRequestData.reduce(
      (acc, { name, count }) => {
        const safeName = capitalize((name ?? '').trim());
        acc.createdLabels.push(
          safeName.length > 12 ? `${safeName.slice(0, 12)}..` : safeName,
        );
        acc.createdTooltips.push(safeName);
        acc.createdCounts.push(count);
        return acc;
      },
      {
        createdLabels: [],
        createdTooltips: [],
        createdCounts: [],
        createdColors: [],
      },
    );
  const { completedCounts } = completedRequestData.reduce(
    (acc, { count }) => {
      acc.completedCounts.push(count);
      return acc;
    },
    {
      completedCounts: [],
    },
  );
  const filteredOnGoingRequestData = onGoingRequestData.filter(
    ({ count }) => count !== 0,
  );
  const { onGoingCounts, onGoingLabels } = filteredOnGoingRequestData.reduce(
    (acc, { name, count }) => {
      const safeName = capitalize((name ?? '').trim());
      acc.onGoingLabels.push(
        safeName.length > 12 ? `${safeName.slice(0, 12)}..` : safeName,
      );
      acc.onGoingCounts.push(count);
      return acc;
    },
    {
      onGoingLabels: [],
      onGoingCounts: [],
      hiddenFlags: [] as boolean[],
    },
  );

  const dataBar = {
    labels: createdLabels,
    datasets: [
      {
        label: 'Created',
        data: createdCounts,
        backgroundColor: ['#63635E30'],
        borderRadius: 4,
        grouped: true,
        barThickness: 15,
      },

      {
        label: 'Completed',
        data: completedCounts,
        backgroundColor: ['#208368'],
        borderRadius: 4,
        grouped: true,
        barThickness: 15,
      },
      {
        label: 'In Progress',
        data: onGoingCounts.map((ele, i) => {
          return {
            x: onGoingLabels[Number(i)],
            y: ele,
          };
        }),
        backgroundColor: ['#63aaf0'],
        borderRadius: 4,
        grouped: true,
        barThickness: 15,
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
              title: (values) => createdTooltips[values[0].dataIndex],
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: false,
              font: { weight: 'bold' },
              text: 'Dates',
            },
            border: {
              color: 'transparent',
            },
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 10,
              },
            },
          },
          y: {
            title: {
              display: false,
              font: { weight: 'bold' },
              text: 'Request',
            },
            border: {
              color: 'transparent',
            },
            grid: {
              display: false,
              color: 'rgba(0, 0, 0, 0.05)',
            },
            display: false,
          },
        },
      }}
      data={dataBar}
    />
  );
};
