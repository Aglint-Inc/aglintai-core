/* eslint-disable security/detect-object-injection */
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  Tooltip,
} from 'chart.js/auto';
import React, { type FC, Suspense } from 'react';
import { Bar } from 'react-chartjs-2';
import { ErrorBoundary } from 'react-error-boundary';

import { Loader } from '@/components/Common/Loader';
import { useMetricsSkillPool } from '@/job/hooks';
import { getOrderedGraphValues } from '@/job/metrics/utils';
import { capitalize } from '@/utils/text/textUtils';

import type { MetricsOptions } from '../types';
import { NoDataAvailable } from './nodata';

ChartJs.register(BarElement, Tooltip, CategoryScale, LinearScale);

const BarChart: React.FC<{
  skills: ReturnType<typeof getOrderedGraphValues>;
}> = ({ skills }) => {
  const matches = React.useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(min-width: 1920px)').matches;
    }
    return false;
  }, []);
  const { labels, tooltips, counts, colors } = skills.reduce(
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
              display: true,
              font: { weight: 'bold' },
              text: 'Skills',
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
              text: 'Candidates',
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

export const DashboardBarChart: FC<{
  option: keyof MetricsOptions<'skillPool'>;
}> = ({ option }) => {
  return (
    <ErrorBoundary fallback={<>Error</>}>
      <Suspense fallback={<Loader />}>
        <Content option={option} />
      </Suspense>
    </ErrorBoundary>
  );
};

const Content: FC<{
  option: keyof MetricsOptions<'skillPool'>;
}> = ({ option }) => {
  const [skillPool] = useMetricsSkillPool();
  const skills = skillPool?.[option] ?? null;
  const total = skills
    ? Object.values(skills).reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0)
    : 0;
  const safeSkills = getOrderedGraphValues(skills);
  if (total === 0) return <NoDataAvailable />;
  return <BarChart skills={safeSkills} />;
};
