/* eslint-disable security/detect-object-injection */
/* eslint-disable no-unused-vars */
import { useMediaQuery } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import { capitalize } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { getOrderedGraphValues } from '@/src/components/Jobs/Job/Dashboard/utils';
ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

export const RequestsBarChart: FC<{
  createdRequestData: { name: string; count: number }[];
  completedRequestData: { name: string; count: number }[];
  onGoingRequestData: { name: string; count: number }[];
}> = ({ createdRequestData, completedRequestData, onGoingRequestData }) => {
  const matches = useMediaQuery('(min-width:1920px)');
  const { createdLabels, createdTooltips, createdCounts, createdColors } =
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
    (acc, { name, count }) => {
      const safeName = capitalize((name ?? '').trim());
      acc.completedLabels.push(
        safeName.length > 12 ? `${safeName.slice(0, 12)}..` : safeName,
      );
      acc.completedLabels.push(safeName);
      acc.completedCounts.push(count);
      return acc;
    },
    {
      completedLabels: [],
      completedTooltips: [],
      completedCounts: [],
      completedColors: [],
    },
  );
  const { onGoingCounts } = onGoingRequestData.reduce(
    (acc, { name, count }) => {
      const safeName = capitalize((name ?? '').trim());
      acc.onGoingLabels.push(
        safeName.length > 12 ? `${safeName.slice(0, 12)}..` : safeName,
      );
      acc.onGoingLabels.push(safeName);
      acc.onGoingCounts.push(count);
      return acc;
    },
    {
      onGoingLabels: [],
      onGoingTooltips: [],
      onGoingCounts: [],
      onGoingColors: [],
    },
  );
  const dataBar = {
    labels: createdLabels,
    datasets: [
      {
        label: 'In progress',
        data: onGoingCounts,
        backgroundColor: ['#63aaf0'],
        borderRadius: 4,
        // borderSkipped: false,
        grouped: true,
        barThickness: 30,
      },
      {
        label: 'Completed',
        data: completedCounts,
        backgroundColor: ['#208368'],
        borderRadius: 4,
        // borderSkipped: false,
        grouped: true,
        barThickness: 30,
      },
      {
        label: 'Created',
        data: createdCounts,
        backgroundColor: ['#63635E30'],
        borderRadius: 4,
        // borderSkipped: false,
        grouped: true,
        barThickness: 30,
      },
    ],
  };

  const [activeIndex, setActiveIndex] = useState(null);

  // const handleClick = (
  //   _,
  //   elements: { datasetIndex: number; index: number }[],
  // ) => {
  //   if (elements.length > 0) {
  //     const { datasetIndex, index } = elements[0];
  //     const label = dataBar.labels[index];
  //     const value = dataBar.datasets[datasetIndex].data[index];
  //     //   console.log(label, value);
  //     getSelectedBar({ label, value });
  //     setActiveIndex(index);
  //   }
  // };

  // useEffect(() => {
  //   if (data.length) {
  //     handleClick(null, [
  //       {
  //         datasetIndex: 0,
  //         index: data.slice(data.length - 10, data.length).length - 1,
  //       },
  //     ]);
  //   }
  // }, [data]);

  // const getDataset = () => {
  //   return dataBar.datasets.map((dataset, datasetIndex) => {
  //     return {
  //       ...dataset,
  //       backgroundColor: 'rgba(99, 99, 94, 0.2)',

  //       // borderSkipped: true,
  //       borderRadius: 4,
  //     };
  //   });
  // };

  // const updatedData = {
  //   ...dataBar,
  //   datasets: getDataset(),
  // };

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
            stacked: true,

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
            stacked: true,
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
        // onClick: handleClick,
      }}
      data={dataBar}
    />
  );
};
