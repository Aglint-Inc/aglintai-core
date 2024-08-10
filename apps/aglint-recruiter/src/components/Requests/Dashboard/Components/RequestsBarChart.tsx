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
  data: ReturnType<typeof getOrderedGraphValues>;
  getSelectedBar: ({ label, value }: { label: string; value: number }) => void;
}> = ({ data, getSelectedBar }) => {
  const matches = useMediaQuery('(min-width:1920px)');
  const { labels, tooltips, counts, colors } = data
    .slice(data.length - 10, data.length)
    .reduce(
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
        label: 'requests',
        data: counts,
        backgroundColor: colors,
        borderRadius: 4,
        // borderSkipped: false,
        grouped: true,
        barThickness: 30,
      },
    ],
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (
    _,
    elements: { datasetIndex: number; index: number }[],
  ) => {
    if (elements.length > 0) {
      const { datasetIndex, index } = elements[0];
      const label = dataBar.labels[index];
      const value = dataBar.datasets[datasetIndex].data[index];
      //   console.log(label, value);
      getSelectedBar({ label, value });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (data.length) {
      handleClick(null, [
        {
          datasetIndex: 0,
          index: data.slice(data.length - 10, data.length).length - 1,
        },
      ]);
    }
  }, [data]);

  const getDataset = () => {
    return dataBar.datasets.map((dataset, datasetIndex) => {
      return {
        ...dataset,
        backgroundColor: dataset.data.map((dataPoint, index) =>
          index === activeIndex ? '#F76B15' : 'rgba(99, 99, 94, 0.2)',
        ),

        // borderSkipped: true,
        borderRadius: 4,
      };
    });
  };

  const updatedData = {
    ...dataBar,
    datasets: getDataset(),
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
        onClick: handleClick,
      }}
      data={updatedData}
    />
  );
};
